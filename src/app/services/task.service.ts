import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);
  url = 'http://127.0.0.1:8000/tasks';

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  create(task: Task): Observable<Task> {
    return this.http.post(this.url, task);
  }  
  
  update(id: number, data: Task): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
