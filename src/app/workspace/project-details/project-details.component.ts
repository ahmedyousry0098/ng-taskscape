import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { IEmployee, IProject, IRole } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}
  isSubmitted = false;
  isLoading: boolean = false;
  fieldsetDisabled: boolean = false;
  project: IProject = {
    projectName: '',
    startDate: '',
    deadline: '',
    description: '',
    scrumMaster: '',
    employees: <IEmployee[]>[],
    organization: '',
    _id: '',
    sprints: [],
  };
  checkedEmployees?: any[];
  projectName?: string;
  projectId: string = '';
  employees?: IEmployee[];
  projectEmployees?: IEmployee[];
  notInProjectEmployees?: IEmployee[] = [];
  orgId: string = this.auth.getDecodedToken().orgId;
  scrumMaster: string = this.auth.getDecodedToken()._id;
  IRole: IRole = this.auth.getDecodedToken().role;
  projectDuration?: number;
  editProjectForm = this.formBuilder.group({
    projectName: [
      { value: '', disabled: this.isMember() },
      [Validators.required],
    ],
    startDate: [
      { value: '', disabled: this.isMember() },
      [Validators.required],
    ],
    deadline: [{ value: '', disabled: this.isMember() }, [Validators.required]],
    projectDuration: [{ value: '', disabled: true }, [Validators.required]],

    description: [
      { value: '', disabled: this.isMember() },
      [Validators.required],
    ],
    employees: [
      { value: '', disabled: this.isMember() },
      [Validators.required],
    ],
    organization: [`${this.orgId}`],
    scrumMaster: [`${this.scrumMaster}`],
  });
  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.editProjectForm);
    if (this.editProjectForm.valid) {
    }
  }
  calcProjectDuration() {
    const date1 = new Date(this.project.startDate);
    const date2 = new Date(this.project.deadline);
    const difInTime = date2.getTime() - date1.getTime();
    this.projectDuration = difInTime / (1000 * 3600 * 24);
  }
  isMember() {
    if (IRole.member == this.auth.getDecodedToken().role) {
      return true;
    } else {
      return false;
    }
  }

  getProjectDetails() {
    this.projectService
      .getProjectDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.project = res.details;
          this.projectName = this.project?.projectName;
          this.projectEmployees = this.project.employees;
          this.checkedEmployees = this.projectEmployees.map((emp) => {
            return emp._id;
          });
          this.projectId = this.project._id;
          this.calcProjectDuration();
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
        this.getEmpNotInProjectOnly();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addEmployee(data: any) {
    this.isLoading = true;
    this.projectService.addEmployee(data).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmpNotInProjectOnly();
        this.getProjectDetails();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  delEmployee(data: any) {
    this.isLoading = true;

    this.projectService.delEmployee(data).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmpNotInProjectOnly();
        this.getProjectDetails();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getEmpNotInProjectOnly() {
    this.notInProjectEmployees = this.employees?.filter((employee) => {
      return !this.projectEmployees?.some((projEmp) => {
        return employee._id === projEmp._id;
      });
    });
  }
  ngOnInit() {
    this.getAllEmployees();
    this.getProjectDetails();
  }

  // ngDoCheck() {
  //   this.getEmpNotInProjectOnly();
  //   this.getProjectDetails();
  // }
}
