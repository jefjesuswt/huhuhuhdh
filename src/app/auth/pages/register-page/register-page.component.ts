import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public register(): void {
    const {email, name, password} = this.myForm.value
    this.authService.register(email, name, password)
      .subscribe({
        next: () => console.log('Redirecting to dashboard...'),
        error: (err) => {
          Swal.fire('Oops', err.error.message, 'error')
        }
      })
  }
}
