import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  addTaskComment(taskId: string, comment: string): Observable<any> {
    console.log(taskId, comment);
    return this.HttpClient.post(
      `${this.baseUrl}/comment/addcomment/${taskId}`,
      { text: comment }
    );
  }
  editTaskComment(commentId: string, comment: string): Observable<any> {
    console.log(commentId, comment);
    return this.HttpClient.patch(
      `${this.baseUrl}/comment/editcomment/${commentId}`,
      { text: comment }
    );
  }

  getComments(taskId: string): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/comment/${taskId}`);
  }
}
