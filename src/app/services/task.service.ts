import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITaskDetailed } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private newTaskSubject = new BehaviorSubject<ITaskDetailed | null>(null);
  newTask$ = this.newTaskSubject.asObservable();

  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  createTask(
    sprintId: string | null | undefined,
    taskName: string | null | undefined,
    description: string | null | undefined,
    start_date: Date | null,
    deadline: Date | null,
    assignTo: string | null | undefined,
    project: string | null | undefined
  ): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/task/createtask/${sprintId}`, {
      taskName,
      description,
      start_date,
      deadline,
      assignTo,
      project,
    });
  }

  getEmployeeTasks(empId: string): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/task/emp-tasks/${empId}`);
  }
  getScrumTasks(empId: string): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/task/scrum-tasks/${empId}`);
  }
  notifyNewTask(newTask: ITaskDetailed) {
    this.newTaskSubject.next(newTask);
  }
}
