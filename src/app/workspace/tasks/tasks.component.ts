import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import {
  IEmployee,
  IProject,
  IRole,
  ISprint,
  ITask,
  ITaskDetailed,
} from 'src/interfaces/interfaces';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  sprints!: ISprint[];
  tasks: ITaskDetailed[] = [];
  task: ITaskDetailed[] = [];
  todoTasks: ITaskDetailed[] = [];
  doneTasks: ITaskDetailed[] = [];
  doingTasks: ITaskDetailed[] = [];
  imageUrl: string = '../../../assets/noavatar.jpg';
  modalRef: BsModalRef | undefined;
  taskId: string = '';
  commentCounts: { [taskId: string]: number } = {};
  countcomment: { taskId: string; count: number } = { taskId: '', count: 0 };

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

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
    const initialState = {
      task: task,
      commentCounts: this.commentCounts,
    };
    this.modalRef = this.modalService.show(TaskDetailsComponent, {
      initialState,
    });
    this.modalRef.content.commentCountChanged.subscribe((count: number) => {
      this.commentCounts[task._id] = count;
    });
  }

  getTasksOfEmployee() {
    this.taskService.getEmployeeTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
    });
  }
  getTasksOfScrum() {
    this.taskService.getScrumTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
    });
  }
  updateTaskLists() {
    this.taskService.getScrumTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
    });
  }
  updateTaskListsMember() {
    this.taskService.getEmployeeTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todoTasks = this.tasks.filter((task) => task.status === 'todo');
      this.doingTasks = this.tasks.filter((task) => task.status === 'doing');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
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
