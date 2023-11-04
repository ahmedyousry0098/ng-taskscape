import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { IProject, IRole, ISprint, ITask } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css'],
})
export class SprintDetailsComponent {
  sprintId: string = '';
  IRole!: IRole;
  sprints: ISprint[] = [];
  sprintName: string = '';
  startDate: string = '';
  deadline: string = '';
  tasks: ITask[] = [];
  project: IProject[] = [];
  projectName: string = '';
  employeeNAme: string = '';
  imageUrl: string = '../../../assets/noavatar.jpg';
  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const sprintId = params.get('id');
      if (sprintId) {
        this.sprintId = sprintId;
      }
    });
    this.getSprintDetails();
  }

  getSprintDetails() {
    console.log(this.sprintId);
    this.sprintService.getSprintDetails(this.sprintId).subscribe((data) => {
      this.sprintName = data.details.sprint_name;
      this.startDate = data.details.start_date;
      this.deadline = data.details.deadline;
      this.projectName = data.details.project.projectName;
      this.tasks = data.details.tasks;
    });
  }
}
