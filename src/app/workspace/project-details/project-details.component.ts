import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}
  project?: IProject;
  projectName: string = 'project name';
  ngOnInit() {
    this.projectService
      .getProjectDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          this.project = res.details;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
