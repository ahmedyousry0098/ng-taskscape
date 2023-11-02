import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IEmployee, IProject } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  showModal = false;
  isLoading: boolean = false;
  project: IProject = {
    projectName: '',
    startDate: '',
    deadline: '',
    description: '',
    scrumMaster: '',
    employees: <IEmployee[]>[],
    organization: '',
    _id: '',
  };
  projectName?: string;
  projectId: string = '';
  employees?: IEmployee[];
  projectEmployees?: IEmployee[];
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  toggleModal() {
    console.log(2);
    this.showModal = !this.showModal;
  }
  getProjectDetails() {
    this.projectService
      .getProjectDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          this.project = res.details;
          this.projectName = this.project?.projectName;
          this.projectEmployees = this.project?.employees;
          this.projectId = this.project._id;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getAllEmployees() {
    this.projectService.getAllUsers().subscribe({
      next: (data) => {
        this.employees = data.employees;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addEmployee(data: any) {
    this.projectService.addEmployee(data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  delEmployee(data: any) {
    this.projectService.delEmployee(data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit() {
    this.getProjectDetails();
    this.getAllEmployees();
  }
}
