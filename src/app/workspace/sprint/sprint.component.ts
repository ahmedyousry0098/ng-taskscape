import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';

import {
  IProject,
  IProjectWithSprint,
  IRole,
  ISprint,
} from 'src/interfaces/interfaces';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent {
  isLoading: boolean = false;
  projects: IProjectWithSprint[] = [];
  IRole!: IRole;
  sprints!: ISprint[];
  projectId!: string | null;
  orgId: string | null = this.authService.getDecodedToken().orgId;
  employeeID: string | null = this.authService.getDecodedToken()._id;
  showModal = false;
  activeProject: IProjectWithSprint[] = [];
  isLoadingSprits: boolean = true;
  colorClass = [
    'bg-blue-200',
    'bg-stone-300',
    'bg-teal-100	',
    'bg-teal-300	',
    'bg-sky-200	',
  ];

  constructor(
    private sprintService: SprintService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.IRole = this.authService.getDecodedToken().role;
    if (this.IRole === IRole.scrumMaster) {
      this.getScrumProjects();
    } else {
      this.getEmployeeProject();
    }
    this.sprintService.getSprintAddedObservable().subscribe(() => {
      this.getScrumProjects();
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
  onToggleModal(showModal: boolean) {
    this.showModal = showModal;
  }

  getScrumProjects() {
    this.isLoadingSprits = true;
    this.sprintService.getScrumProjects(this.employeeID).subscribe((data) => {
      this.sprints = data.projects.sprints;

      this.projects = data.projects.map((item: IProject, index: number) => ({
        ...item,
        backGround:
          index >= this.colorClass.length
            ? this.colorClass[index % this.colorClass.length]
            : this.colorClass[index],
      }));
      this.isLoadingSprits = false;
    });
  }

  getEmployeeProject() {
    this.isLoadingSprits = true;
    this.sprintService.getEmployeeProject(this.employeeID).subscribe((data) => {
      this.sprints = data.projects.sprints;
      this.projects = data.projects.map((item: IProject, index: number) => ({
        ...item,
        backGround:
          index >= this.colorClass.length
            ? this.colorClass[index % this.colorClass.length]
            : this.colorClass[index],
      }));
      this.isLoadingSprits = false;
    });
  }
  getProjectId(id: string) {
    this.activeProject = this.projects?.filter((project) => project._id === id);
    console.log(this.activeProject[0].startDate);
  }
}
