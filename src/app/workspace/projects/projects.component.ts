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
import { EmployeeService } from 'src/app/services/project.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private projectService: EmployeeService,
    private auth: AuthService
  ) {}
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  addNewProjectForm = this.formBuilder.group({
    projectName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
    employees: ['', [Validators.required]],
    organization: [`${this.orgId}`],
    scrumMaster: [`${this.scrumMaster}`],
  });
  onSubmit(): void {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.addNewProjectForm.valid) {
      this.projectService
        .createNewProject(this.addNewProjectForm.value)
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
