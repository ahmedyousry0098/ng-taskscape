// import { IEmployee, IProject, IRole } from './../../../interfaces/interfaces';
// import { formatPercent } from '@angular/common';
// import { Component } from '@angular/core';
// import {
//   AbstractControl,
//   FormBuilder,
//   FormControl,
//   Validators,
// } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
// import { ProjectService } from 'src/app/services/project.service';
// import {
//   NameValidator,
//   dateGreaterThanNowAndStart,
//   dateGreaterThanNowValidator,
// } from 'src/app/validators/customValidators';
// import { NotificationService } from 'src/app/services/notification.service';

// @Component({
//   selector: 'app-projects',
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css'],
// })
// export class ProjectsComponent {
//   employees?: IEmployee[];
//   IRole: IRole = this.auth.getDecodedToken().role;
//   orgId: string = this.auth.getDecodedToken().orgId;
//   scrumMaster: string = this.auth.getDecodedToken()._id;
//   projects?: IProject[];
//   isSubmitted = false;
//   isLoading: boolean = false;
//   colorClass = [
//     'bg-blue-200',
//     'bg-stone-300',
//     'bg-teal-100	',
//     'bg-teal-300	',
//     'bg-sky-200	',
//   ];

//   constructor(
//     private formBuilder: FormBuilder,
//     private projectService: ProjectService,
//     private auth: AuthService,
//     private _notification: NotificationService
//   ) {}
//   showModal = false;
//   toggleModal() {
//     this.showModal = !this.showModal;
//     // this.addNewProjectForm.reset();
//   }
//   onBackdropClick(event: Event): void {
//     if (event.target === event.currentTarget) {
//       this.toggleModal();
//     }
//   }

//   addNewProjectForm = this.formBuilder.group({
//     projectName: [
//       '',
//       [Validators.minLength(3), Validators.required, NameValidator()],
//     ],
//     start_date: [
//       new Date(),
//       [Validators.required, dateGreaterThanNowValidator],
//     ],
//     deadline: [
//       new Date(),
//       [
//         Validators.required,
//         dateGreaterThanNowValidator,
//         dateGreaterThanNowAndStart,
//       ],
//     ],
//     description: ['', [Validators.minLength(5), Validators.required]],
//     employees: ['', [Validators.required]],
//     organization: [`${this.orgId}`],
//     scrumMaster: [`${this.scrumMaster}`],
//   });
//   onSubmit(): void {
//     this.isSubmitted = true;
//     this.isLoading = true;
//     console.log(this.scrumMaster, 'this.scrumMaster');
//     console.log(this.orgId, 'this.orgId');
//     if (this.addNewProjectForm.valid) {
//       const {
//         projectName,
//         description,
//         start_date,
//         deadline,
//         employees,
//         organization,
//         scrumMaster,
//       } = this.addNewProjectForm.value;
//       console.log(this.addNewProjectForm.value);
//       this.projectService
//         .createNewProject({
//           projectName: projectName,
//           description: description,
//           startDate: start_date,
//           deadline: deadline,
//           employees: employees,
//           organization: organization,
//           scrumMaster: scrumMaster,
//         })
//         .subscribe({
//           next: (res) => {
//             console.log();
//             this.isLoading = false;
//             this.getScrumMasterProjects();
//             this.toggleModal();
//             // this.addNewProjectForm.reset();
//           },
//           error: (err) => {
//             console.log(err);
//             this.isLoading = false;
//             this._notification.showNotification(err.message, 'OK', 'error');
//           },
//         });
//     }
//   }

//   getScrumMasterProjects() {
//     this.projectService.getAllProjectsScrum().subscribe(
//       (data) =>
//         (this.projects = data.projects.map((item: IProject, index: number) => ({
//           ...item,
//           backGround:
//             index >= this.colorClass.length
//               ? this.colorClass[index % this.colorClass.length]
//               : this.colorClass[index],
//         })))
//     );
//   }
//   ngOnInit() {
//     console.log(this.orgId, 'org');
//     console.log(this.scrumMaster);
//     this.IRole = this.auth.getDecodedToken().role;

//     if (this.IRole === IRole.scrumMaster) {
//       this.projectService.getAllUsers().subscribe(({ employees }) => {
//         this.employees = employees;
//         this.getScrumMasterProjects();
//       });
//     } else if (this.IRole === IRole.member) {
//       this.projectService.getAllProjectsEmployee().subscribe(
//         (data) =>
//           (this.projects = data.projects.map(
//             (item: IProject, index: number) => ({
//               ...item,
//               backGround:
//                 index >= this.colorClass.length
//                   ? this.colorClass[index % this.colorClass.length]
//                   : this.colorClass[index],
//             })
//           ))
//       );
//     }
//   }
// }

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
import { NotificationService } from 'src/app/services/notification.service';

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
    'bg-pink-300',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private auth: AuthService,
    private _notification: NotificationService
  ) {}
  showModal = false;
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
            console.log();
            this.isLoading = false;
            this.getScrumMasterProjects();
            this.toggleModal();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            this._notification.showNotification(err.message, 'OK', 'error');
          },
        });
    }
  }

  getScrumMasterProjects() {
    this.projectService.getAllProjectsScrum().subscribe(
      (data) =>
        (this.projects = data.projects.map((item: IProject, index: number) => ({
          ...item,
          backGround:
            index >= this.colorClass.length
              ? this.colorClass[index % this.colorClass.length]
              : this.colorClass[index],
        })))
    );
  }
  ngOnInit() {
    this.IRole = this.auth.getDecodedToken().role;

    if (this.IRole === IRole.scrumMaster) {
      this.projectService.getAllUsers().subscribe(({ employees }) => {
        this.employees = employees;
        this.getScrumMasterProjects();
      });
    } else if (this.IRole === IRole.member) {
      this.projectService.getAllProjectsEmployee().subscribe(
        (data) =>
          (this.projects = data.projects.map(
            (item: IProject, index: number) => ({
              ...item,
              backGround:
                index >= this.colorClass.length
                  ? this.colorClass[index % this.colorClass.length]
                  : this.colorClass[index],
            })
          ))
      );
    }
  }
}
