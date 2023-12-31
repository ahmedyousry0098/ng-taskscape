import { Component, Inject, Input, Output } from '@angular/core';
import { IRole, ITaskDetailed, ITaskUpdate } from 'src/interfaces/interfaces';
import { Collapse, Ripple, initTE } from 'tw-elements';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationChangeStatusComponent } from '../confirmation-change-status/confirmation-change-status.component';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NameValidator,
  dateGreaterThanNowAndStartCustom,
  dateGreaterThanNowValidator,
} from 'src/app/validators/customValidators';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  commentCounts: { [taskId: string]: number } = {};

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.task) {
      this.task = data.task;
    }
  }
  ngOnInit() {
    this.IRole = this.authService.getDecodedToken().role;
    initTE({ Collapse, Ripple });
    const taskStartDate = new Date(this.task.startDate);
    this.updateTaskForm = this.formBuilder.group({
      taskName: [
        this.task.taskName,
        [Validators.minLength(5), NameValidator()],
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
    console.log(this.task);
  }

  closeModal() {
    this.dialogRef.close();
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
