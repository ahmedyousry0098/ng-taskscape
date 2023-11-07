import { ProjectService } from 'src/app/services/project.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IEmployee, IRole } from 'src/interfaces/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {}
  employeeRole: IRole = this.auth.getDecodedToken().role;
  isSubmitted: boolean = false;
  allEmployees: IEmployee[] = [];
  checkedEmployees: any[] = [];
  projectEmployees: IEmployee[] = [];
  projectId: string = '';
  orgId: string = '';
  noEmployeesArray: boolean = false;

  editProjectForm: FormGroup = this.formBuilder.group({
    projectName: [
      {
        value: '',
        disabled: this.isMember(),
      },
      [Validators.minLength(3), Validators.required],
    ],
    employees: [{ value: '', disabled: this.isMember() }, Validators.required],
    startDate: [{ value: '', disabled: this.isMember() }],
    deadline: [{ value: '', disabled: this.isMember() }],
    projectDuration: [{ value: '', disabled: true }],
    description: [
      { value: '', disabled: this.isMember() },
      [Validators.minLength(3), Validators.required],
    ],
    sprintsCount: [{ value: '', disabled: true }],
  });

  getProjectDetails() {
    this.projectService
      .getProjectDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: ({ details }) => {
          this.projectEmployees = details.employees;
          this.projectId = details._id;
          this.orgId = details.organization;
          const date1 = new Date(details.startDate);
          const date2 = new Date(details.deadline);
          const difInTime = date2.getTime() - date1.getTime();
          this.editProjectForm.setValue({
            projectName: details.projectName,
            description: details.description,
            startDate: this.datePipe.transform(details.startDate, 'yyyy-MM-dd'),
            deadline: this.datePipe.transform(details.deadline, 'yyyy-MM-dd'),
            projectDuration: difInTime / (1000 * 3600 * 24),
            sprintsCount: details.sprints.length,
            employees: details.employees?.map((emp: any) => {
              return emp._id;
            }),
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  isMember() {
    if (IRole.member == this.employeeRole) {
      return true;
    } else {
      return false;
    }
  }
  getAllEmployees() {
    this.projectService.getAllUsers().subscribe({
      next: (data) => {
        this.allEmployees = data.employees;
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

        this.getProjectDetails();
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
        this.getProjectDetails();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateEmployees({ employees }: any) {
    const newEmpArr = [...employees];
    const originalArr = this.projectEmployees?.map((emp) => {
      return emp._id;
    });
    //check the employees aren't 0
    //delete employees
    if (newEmpArr.length < originalArr.length) {
      if (newEmpArr.length === 0) {
        this.noEmployeesArray = true;
        this.getProjectDetails();
      } else {
        this.noEmployeesArray = false;

        const removedEmp = originalArr?.filter((originalId) => {
          return !newEmpArr?.some((newId) => {
            return originalId === newId;
          });
        });
        removedEmp?.forEach((emp) =>
          this.delEmployee({
            organization: this.orgId,
            project: this.projectId,
            employee: removedEmp[0],
          })
        );
      }
    } else {
      //addEmployees
      // this.noEmployeesArray = false;

      const newEmp = newEmpArr?.filter((originalId) => {
        return !originalArr?.some((newId) => {
          return originalId === newId;
        });
      });

      this.addEmployee({
        organization: this.orgId,
        project: this.projectId,
        employees: newEmp,
      });
    }
  }
  updateProject(data: any) {
    this.projectService
      .updateProject(data, this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.editProjectForm);
    if (this.editProjectForm.valid) {
      const { projectName, description, startDate, deadline } =
        this.editProjectForm.value;
      this.updateProject({
        projectName: this.editProjectForm.value.projectName,
        description: this.editProjectForm.value.description,
        startDate: this.editProjectForm.value.startDate,
        deadline: this.editProjectForm.value.deadline,
      });
    }
  }
  ngOnInit() {
    this.getAllEmployees();
    this.getProjectDetails();
  }
}
