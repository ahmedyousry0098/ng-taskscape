import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';
import {
  dateGreaterThanNowAndStart,
  dateGreaterThanNowValidator,
} from 'src/app/validators/customValidators';
import {
  IEmployee,
  IProjectWithSprintsAndEmployee,
  IRole,
  ISprint,
} from 'src/interfaces/interfaces';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css'],
})
export class CreatetaskComponent {
  @Input() showModal: boolean = false;
  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  employees: IEmployee[] = [];
  employeeID: string = this.authService.getDecodedToken()._id;
  isLoading: boolean = false;
  projects: IProjectWithSprintsAndEmployee[] = [];
  sprints!: ISprint[];
  selectedProjectId: string | undefined;
  sprintId: string | undefined;
  IRole!: IRole;

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private authService: AuthService,
    private taskService: TaskService,
    private notification: NotificationService
  ) {}
  closeModal() {
    this.toggleModal.emit(false);
  }
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  ngOnInit() {
    this.IRole = this.authService.getDecodedToken().role;
    if (this.IRole === IRole.scrumMaster) {
      this.getScrumProjects();
      this.updateAvailableSprints();
    }
  }

  getScrumProjects() {
    this.sprintService.getScrumProjects(this.employeeID).subscribe((data) => {
      this.projects = data.projects;
    });
  }

  createTaskForm = this.formBuilder.group({
    taskName: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    start_date: [
      new Date(),
      [Validators.required, dateGreaterThanNowValidator],
    ],
    deadline: [
      new Date(),
      [
        Validators.required,
        dateGreaterThanNowValidator,
        dateGreaterThanNowAndStart,
      ],
    ],
    assignTo: ['', Validators.required],
    sprintId: ['', Validators.required],
    projectId: ['', Validators.required],
  });

  updateAvailableSprints() {
    const projectId = this.createTaskForm.get('projectId')?.value;
    if (projectId) {
      const selectedProject = this.projects.find(
        (project) => project._id === projectId
      );
      if (selectedProject) {
        this.sprints = selectedProject.sprints;
        this.employees = selectedProject.employees;
      } else {
        this.sprints = [];
        this.employees = [];
      }
    }
  }

  handleCreateTask() {
    this.isLoading = true;
    const sprintId = this.createTaskForm.get('sprintId')?.value;
    const taskName = this.createTaskForm.get('taskName')?.value;
    const description = this.createTaskForm.get('description')?.value;
    const start_date = this.createTaskForm.get('start_date')?.value;
    const deadline = this.createTaskForm.get('deadline')?.value;
    const assignTo = this.createTaskForm.get('assignTo')?.value;
    const project = this.createTaskForm.get('projectId')?.value;
    if (start_date && deadline) {
      this.taskService
        .createTask(
          sprintId,
          taskName,
          description,
          start_date,
          deadline,
          assignTo,
          project
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.notification.showNotification(res.message, 'OK', 'success');
            this.taskService.notifyNewTask(res.task);
            this.toggleModal.emit(false);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            this.closeModal();
            this.notification.showNotification(err.error.error, 'OK', 'error');
          },
        });
    }
  }
}
