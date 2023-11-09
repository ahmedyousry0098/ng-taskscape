import { Component, Input } from '@angular/core';
import {
  IRole,
  IStatus,
  ITaskDetailed,
  ITaskUpdate,
} from 'src/interfaces/interfaces';
import { Collapse, Ripple, initTE } from 'tw-elements';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationChangeStatusComponent } from '../confirmation-change-status/confirmation-change-status.component';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  dateGreaterThanNowAndStartCustom,
  dateGreaterThanNowValidator,
  taskNameValidator,
} from 'src/app/validators/customValidators';

initTE({ Collapse, Ripple });
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  showModalDetails: boolean = false;
  @Input() task!: ITaskDetailed;
  isLoading: boolean = false;
  IRole!: IRole;
  newStatus!: string;
  isEditing: boolean = false;
  editing: boolean = false;
  taskName!: string;
  updateTaskForm!: FormGroup;
  taskNameValue!: string;
  descriptionValue!: string;
  deadlineValue!: string;
  imageURL = '../../../assets/noavatar.jpg';
  assignToObj!: {};
  projectObj!: {};
  sprintObj!: {};

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.IRole = this.authService.getDecodedToken().role;
    initTE({ Collapse, Ripple });
    const taskStartDate = new Date(this.task.startDate);
    this.updateTaskForm = this.formBuilder.group({
      taskName: [
        this.task.taskName,
        [Validators.minLength(5), taskNameValidator()],
      ],
      description: [this.task.description, [Validators.minLength(5)]],
      deadline: [
        this.task.deadline,
        [
          dateGreaterThanNowValidator,
          dateGreaterThanNowAndStartCustom(taskStartDate),
        ],
      ],
    });
    this.taskNameValue = this.task.taskName;
    this.descriptionValue = this.task.description;
    this.deadlineValue = this.task.deadline;

    this.assignToObj = this.task.assignTo;
    this.projectObj = this.task.project;
    this.sprintObj = this.task.sprint;
  }

  closeModal() {
    this.showModalDetails = !this.showModalDetails;
  }
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  openConfirmationDialog(task: ITaskUpdate, newStatus: string) {
    const dialogRef = this.dialog.open(ConfirmationChangeStatusComponent, {
      data: { task, newStatus },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        task.status = newStatus;
        if (this.IRole === IRole.scrumMaster) {
          this.updateTaskStatusScrum(task._id, newStatus);
        } else {
          this.updateTaskStatusMember(task._id, newStatus);
        }
      }
    });
  }

  updateTaskStatusScrum(taskId: string, newStatus: string) {
    console.log(taskId, newStatus);
    this.taskService.updateStatusForScrum(taskId, newStatus).subscribe({
      next: (res) => {
        this.taskService.updateTasks(res.updatedTasks);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateTaskStatusMember(taskId: string, newStatus: string) {
    console.log(newStatus);
    this.taskService.updateStatusForMember(taskId, newStatus).subscribe({
      next: (res) => {
        this.taskService.updateTasks(res.updatedTasks);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEditing() {
    this.editing = !this.editing;
  }
  startEditing() {
    this.isEditing = true;
  }
  finishEditing() {
    if (this.updateTaskForm.valid) {
      this.isLoading = true;

      this.taskService
        .updateTaskDetail(this.task._id, this.updateTaskForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.isEditing = false;
            this.task = {
              ...res.updatedTask,
              assignTo: this.assignToObj,
              sprint: this.sprintObj,
              project: this.projectObj,
            };
            this.taskService.updateTasks(res.updatedTasks);

            console.log(res);
            this.editing = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }
}
