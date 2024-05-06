import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  url = 'http://127.0.0.1:8000/users';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  create(task: User): Observable<User> {
    return this.http.post(this.url, task);
  }  
  
  update(id: number, data: User): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
