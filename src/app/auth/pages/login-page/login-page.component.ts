import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';



@Component({
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  private error?: string;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email],],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login(): void {
    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          if (!(typeof err.error.message === 'string')) Swal.fire('Oops', err.error.message[0], 'error')

          Swal.fire('Oops...', err.error.message, 'error')
        }
      })

  }

}
