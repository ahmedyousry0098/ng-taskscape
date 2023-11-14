import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import {
  IEmployee,
  IProject,
  IRole,
  ISprint,
  ITaskDetailed,
} from 'src/interfaces/interfaces';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommentService } from 'src/app/services/comment.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  IRole!: IRole;
  projects: IProject[] = [];
  employees: IEmployee[] = [];
  employeeID: string = this.authService.getDecodedToken()._id;
  showModal = false;
  showModalDetails: boolean = false;
  sprints!: ISprint[];
  tasks: ITaskDetailed[] = [];
  task: ITaskDetailed[] = [];
  todoTasks: ITaskDetailed[] = [];
  doneTasks: ITaskDetailed[] = [];
  doingTasks: ITaskDetailed[] = [];
  imageUrl: string = '../../../assets/noavatar.jpg';
  modalRef: BsModalRef | undefined;
  taskId: string = '';
  commentCounts!: any;
  comments!: string[];
  isLoadingTasks: boolean = true;
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}
  private getCommentCounts() {
    const commentRequests = this.tasks.map((task) =>
      this.commentService.getComments(task._id)
    );

    forkJoin(commentRequests).subscribe((responses) => {
      responses.forEach((res, index) => {
        this.tasks[index].commentCount = res.comments.length;
      });

      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.IRole = this.authService.getDecodedToken().role;
    if (this.IRole === IRole.scrumMaster) {
      this.getTasksOfScrum();
      this.taskService.newTask$.subscribe((newTask) => {
        if (newTask) {
          this.tasks.push(newTask);
          this.updateTaskLists();
        }
      });
      this.taskService.tasks$.subscribe((updatedTasks) => {
        this.tasks = updatedTasks;
        this.updateTaskLists();
      });
    } else {
      this.getTasksOfEmployee();
      this.taskService.tasks$.subscribe((updatedTasks) => {
        this.tasks = updatedTasks;
        this.updateTaskListsMember();
      });
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
  onToggleModal(showModal: boolean) {
    this.showModal = showModal;
  }

  openTaskDetails(task: ITaskDetailed) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: { task: task },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  getTasksOfEmployee() {
    this.isLoadingTasks = true;
    this.taskService.getEmployeeTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.getCommentCounts();
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      this.isLoadingTasks = false;
    });
  }
  getTasksOfScrum() {
    this.isLoadingTasks = true;
    this.taskService.getScrumTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.getCommentCounts();
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      this.isLoadingTasks = false;
    });
  }
  updateTaskLists() {
    this.isLoadingTasks = true;
    this.taskService.getScrumTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.getCommentCounts();
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      this.isLoadingTasks = false;
    });
  }
  updateTaskListsMember() {
    this.isLoadingTasks = true;
    this.taskService.getEmployeeTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.getCommentCounts();
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      this.isLoadingTasks = false;
    });
  }
  onDrop(event: CdkDragDrop<ITaskDetailed[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const taskToMove: ITaskDetailed = event.item.data;
      this.moveTaskToNewStatus(taskToMove, newStatus);
    }
  }

  moveTaskToNewStatus(task: ITaskDetailed, newStatus: string) {
    this.taskId = task._id;
    if (this.IRole === IRole.scrumMaster) {
      this.updateTaskStatusScrum(this.taskId, newStatus);
    } else {
      this.updateTaskStatusMember(this.taskId, newStatus);
    }
  }

  updateTaskStatusScrum(taskId: string, newStatus: string) {
    this.taskService.updateStatusForScrum(taskId, newStatus).subscribe({
      next: (res) => {
        this.taskService.updateTasks([res.updatedTasks]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateTaskStatusMember(taskId: string, newStatus: string) {
    this.taskService.updateStatusForMember(taskId, newStatus).subscribe({
      next: (res) => {
        this.taskService.updateTasks([res.updatedTasks]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
