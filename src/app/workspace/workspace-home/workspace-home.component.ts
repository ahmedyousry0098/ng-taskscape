import { IRole, ITaskDetailed } from './../../../interfaces/interfaces';
import { UserProfileService } from './../../services/user-profile.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IoService } from 'src/app/services/io.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.css'],
})
export class WorkspaceHomeComponent {
  openTab = 1;
  loggedIn: boolean = false;
  employeeName: string = '';
  token: string = '';
  employeeRole: IRole = this.authService.getDecodedToken().role;
  tasks: ITaskDetailed[] = [];
  task: ITaskDetailed[] = [];
  todoTasks: ITaskDetailed[] = [];
  todayToDoTasks: ITaskDetailed[] = [];
  todayDoneTasks: ITaskDetailed[] = [];
  todayOverDueTasks: ITaskDetailed[] = [];
  employeeID: string = this.authService.getDecodedToken()._id;

  constructor(
    private authService: AuthService,
    private userProfile: UserProfileService,
    private taskService: TaskService
  ) {}
  //tasks taps switching
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }
  //check if login
  isUserLoggedIn() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        //get userData
        this.userProfile.getUserProfile().subscribe(({ employee }) => {
          this.employeeName = employee.employeeName;
        });
      }
    });
  }
  getTasksOfEmployee() {
    const todayDate = new Date();
    this.taskService.getEmployeeTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todayToDoTasks = this.tasks.filter(
        (task) =>
          new Date(task.startDate).getDate() === todayDate.getDate() &&
          task.status === 'todo'
      );
      this.todayOverDueTasks = this.tasks.filter(
        (task) =>
          new Date(task.deadline).getDate() < todayDate.getDate() &&
          task.status === 'todo'
      );
      this.todayDoneTasks = this.tasks.filter(
        (task) =>
          new Date(task.startDate).getDate() === todayDate.getDate() &&
          task.status === 'done'
      );
    });
  }
  getTasksOfScrum() {
    const todayDate = new Date();

    this.taskService.getScrumTasks(this.employeeID).subscribe((data) => {
      this.tasks = data.tasks;
      this.todayToDoTasks = this.tasks.filter(
        (task) =>
          new Date(task.startDate).getDate() <= todayDate.getDate() &&
          task.status === 'todo'
      );
      console.log(this.todayToDoTasks);
      this.todayOverDueTasks = this.tasks.filter(
        (task) =>
          new Date(task.deadline).getDate() <= todayDate.getDate() &&
          task.status === 'todo'
      );
      this.todayDoneTasks = this.tasks.filter(
        (task) =>
          new Date(task.startDate).getDate() === todayDate.getDate() &&
          task.status === 'done'
      );
    });
  }
  ngOnInit() {
    this.isUserLoggedIn();
    this.employeeRole = this.authService.getDecodedToken().role;
    if (this.employeeRole === IRole.scrumMaster) {
      this.getTasksOfScrum();
    } else {
      this.getTasksOfEmployee();
    }
  }
}
