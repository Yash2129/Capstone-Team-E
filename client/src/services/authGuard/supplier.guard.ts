import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // Guard to restrict access to routes based on user role
  canActivate(): boolean {
    // Get the role of the current user from the authentication service
    const role = this.authService.getRole;
    // Check if the user has the 'SUPPLIER' role
    if (role === 'SUPPLIER') {
      return true; // Allow access to the route
    } else {
      // Redirect to the dashboard if the user is not authorized
      this.router.navigate(['/dashboard'])
      return false; // Deny access to the route
    }
  }
}
