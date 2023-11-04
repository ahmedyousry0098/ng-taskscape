import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SprintService } from 'src/app/services/sprint.service';
import {
  dateGreaterThanNowAndStart,
  dateGreaterThanNowValidator,
} from 'src/app/validators/customValidators';
import { ISprint } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-addsprint',
  templateUrl: './addsprint.component.html',
  styleUrls: ['./addsprint.component.css'],
})
export class AddsprintComponent {
  @Input() showModal: boolean = false;
  @Input() projects: any[] = [];
  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading: boolean = false;
  employeeID: string | null = this.authService.getDecodedToken()._id;
  sprints!: ISprint[];

  constructor(
    private sprintService: SprintService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
  createSprintForm = this.formBuilder.group({
    projectId: ['', Validators.required],
    sprint_name: ['', [Validators.required, Validators.minLength(5)]],
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
  });
  getScrumProjects() {
    this.sprintService.getScrumProjects(this.employeeID).subscribe((data) => {
      this.projects = data.projects;
      this.sprints = data.projects.sprints;
    });
  }
  handleCreateSprint() {
    this.isLoading = true;
    const projectId = this.createSprintForm.get('projectId')?.value;
    console.log(projectId);
    const sprint_name = this.createSprintForm.get('sprint_name')?.value;
    const start_date = this.createSprintForm.get('start_date')?.value;
    const deadline = this.createSprintForm.get('deadline')?.value;
    this.sprintService
      .createSprint(projectId!, sprint_name!, start_date!, deadline!)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.notification.showNotification(res.message, 'OK', 'success');
          this.closeModal();
          this.getScrumProjects();
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
