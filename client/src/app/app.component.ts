import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  IsLoggin: any = false; // Flag to check if the user is logged in
  roleName: string | null; // Variable to store the role name of the logged-in user

  constructor(private authService: AuthService, private router: Router) {
    // Initialize IsLoggin and roleName properties with AuthService
    this.IsLoggin = authService.getLoginStatus;
    this.roleName = authService.getRole;

    // If the user is not logged in, redirect to the homepage
    if (!this.IsLoggin) {
      this.router.navigateByUrl('/homepage');
    }
  }

  // Method to handle user logout
  logout() {
    // Call AuthService logout method
    this.authService.logout();
    // Reload the page to clear user session data
    window.location.reload();
  }
}
