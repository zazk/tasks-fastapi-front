import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userService = inject(UserService);
  sessionStorageService = inject(SessionStorageService);
  router = inject(Router);

  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  login() {
    const loginData = this.loginForm.getRawValue();
    this.userService.login(loginData).subscribe((r) => {
      if (!r) { return }
      this.sessionStorageService.authToken = r.token ?? this.generateToken()
      this.router.navigateByUrl('/')
    })
  }

  validField(field: string) {
    return (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && this.loginForm.get(field)?.invalid
  }

  generateToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[x-y]/g, match => (Math.random() * 16 | (match === 'y' ? 8 : 0)).toString(16))
  }
}
