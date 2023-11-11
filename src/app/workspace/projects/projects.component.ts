import { IEmployee, IProject, IRole } from './../../../interfaces/interfaces';
import { formatPercent } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import {
  NameValidator,
  dateGreaterThanNowAndStart,
  dateGreaterThanNowValidator,
} from 'src/app/validators/customValidators';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  employees?: IEmployee[];
  IRole: IRole = this.auth.getDecodedToken().role;
  orgId: string = this.auth.getDecodedToken().orgId;
  scrumMaster: string = this.auth.getDecodedToken()._id;
  projects?: IProject[];
  isSubmitted = false;
  isLoading: boolean = false;
  colorClass = [
    'bg-gray-400',
    'bg-red-200	',
    'bg-orange-200	',
    'bg-green-400	',
    'bg-emerald-300	',
    'bg-teal-300	',
    'bg-cyan-400',
    'bg-sky-400	',
    'bg-indigo-300',
    'bg-pink-300	',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private auth: AuthService
  ) {}
  showModal = false;
  getColor() {
    console.log(this.colorClass[Math.floor(Math.random() * 10)]);
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.toggleModal();
    }
  }

  addNewProjectForm = this.formBuilder.group({
    projectName: [
      '',
      [Validators.minLength(3), Validators.required, NameValidator()],
    ],
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
    description: ['', [Validators.minLength(5), Validators.required]],
    employees: ['', [Validators.required]],
    organization: [`${this.orgId}`],
    scrumMaster: [`${this.scrumMaster}`],
  });
  onSubmit(): void {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.addNewProjectForm.valid) {
      const {
        projectName,
        description,
        start_date,
        deadline,
        employees,
        organization,
        scrumMaster,
      } = this.addNewProjectForm.value;

      this.projectService
        .createNewProject({
          projectName: projectName,
          description: description,
          startDate: start_date,
          deadline: deadline,
          employees: employees,
          organization: organization,
          scrumMaster: scrumMaster,
        })
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.getScrumMasterProjects();
            this.toggleModal();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  getScrumMasterProjects() {
    this.projectService
      .getAllProjectsScrum()
      .subscribe((data) => (this.projects = data.projects));
  }
  ngOnInit() {
    this.IRole = this.auth.getDecodedToken().role;

    if (this.IRole === IRole.scrumMaster) {
      this.projectService.getAllUsers().subscribe(({ employees }) => {
        this.employees = employees;
        this.getScrumMasterProjects();
      });
    } else if (this.IRole === IRole.member) {
      this.projectService
        .getAllProjectsEmployee()
        .subscribe((data) => (this.projects = data.projects));
    }
  }
}
