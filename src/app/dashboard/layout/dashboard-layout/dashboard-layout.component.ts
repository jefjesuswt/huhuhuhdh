import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public user = computed(() => this.authService.currentUser());

  onLogout(): void {
    this.authService.logout()
  }
}

