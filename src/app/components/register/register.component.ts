import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  sessionStorageService = inject(SessionStorageService);
  userService = inject(UserService);
  router = inject(Router);

  registerForm = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fullname: ['', Validators.required],
    password: ['', Validators.required],
    token: '',
    status: true
  })

  constructor() {
    this.registerForm.patchValue({
      token: this.generateToken()
    })
  }

  generateToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[x-y]/g, match => (Math.random() * 16 | (match === 'y' ? 8 : 0)).toString(16))
  }

  register() {
    const registerData = this.registerForm.getRawValue();
    this.userService.create(registerData).subscribe((r) => {
      if (!r) { return }
      this.sessionStorageService.authToken = r.token ?? this.generateToken()
      this.router.navigateByUrl('/')
    })
  }

  validField(field: string) {
    return (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && this.registerForm.get(field)?.invalid
  }
}
