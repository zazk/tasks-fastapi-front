import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  authToken$ = new BehaviorSubject(this.authToken);

  set authToken(value: string) {
    this.authToken$.next(value);
    sessionStorage.setItem('token', JSON.stringify(value));
  }

  get authToken() {
    return sessionStorage.getItem('token') ?? '';
  }
}
