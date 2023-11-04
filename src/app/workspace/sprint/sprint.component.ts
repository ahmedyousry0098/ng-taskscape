import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';

import { IProjectWithSprint, IRole, ISprint } from 'src/interfaces/interfaces';

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
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
  onToggleModal(showModal: boolean) {
    this.showModal = showModal;
  }

  getScrumProjects() {
    this.sprintService.getScrumProjects(this.employeeID).subscribe((data) => {
      console.log(data, 'org');
      this.projects = data.projects;

      this.sprints = data.projects.sprints;
    });
  }
  getEmployeeProject() {
    this.sprintService.getEmployeeProject(this.employeeID).subscribe((data) => {
      this.projects = data.projects;

      this.sprints = data.projects.sprints;
    });
  }
}
