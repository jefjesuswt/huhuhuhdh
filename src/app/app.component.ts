import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  private router = inject(Router)
  private authService = inject(AuthService)

  public isAuthCheckDone = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      console.log(this.authService.authStatus());
      return false;
    }
    console.log(this.authService.authStatus());
    return true;
  })

  public effectOnAuthStatusChange = effect(() => {
    // const url: string|null = localStorage.getItem('url')
    switch (this.authService.authStatus()) {

      case AuthStatus.checking:
        console.log(this.authService.authStatus());
        return;

      case AuthStatus.authenticated:
        // url ? this.router.navigateByUrl(url) :
        this.router.navigateByUrl('/dashboard')
        console.log(this.authService.authStatus());
        break;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        console.log(this.authService.authStatus());
        break;
    }
  })
}
