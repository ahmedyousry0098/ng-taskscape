import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITaskDetailed, ITaskUpdate } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private newTaskSubject = new BehaviorSubject<ITaskDetailed | null>(null);
  newTask$ = this.newTaskSubject.asObservable();
  private tasksSubject = new BehaviorSubject<ITaskDetailed[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  createTask(
    sprintId: string | null | undefined,
    taskName: string | null | undefined,
    description: string | null | undefined,
    startDate: Date | null,
    deadline: Date | null,
    assignTo: string | null | undefined,
    project: string | null | undefined
  ): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/task/createtask/${sprintId}`, {
      taskName,
      description,
      startDate,
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

  updateTasks(updatedTasks: ITaskDetailed[]): void {
    this.tasksSubject.next(updatedTasks);
  }

  updateStatusForScrum(taskId: string, newStatus: string): Observable<any> {
    return this.HttpClient.patch(`${this.baseUrl}/task/updatetask/${taskId}`, {
      status: newStatus,
    });
  }

  updateStatusForMember(taskId: string, newStatus: string): Observable<any> {
    console.log(taskId, newStatus, 'ser');
    return this.HttpClient.patch(
      `${this.baseUrl}/task/updatestatus/${taskId}`,
      { status: newStatus }
    );
  }

  updateTaskDetail(taskId: string, data: any): Observable<any> {
    return this.HttpClient.patch(
      `${this.baseUrl}/task/updatetask/${taskId}`,
      data
    );
  }
}
