import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({ 
  providedIn : 'root'
})

export class retailerGuard implements CanActivate  {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is a retailer
    const isRetailer = localStorage.getItem('isRetailer') === 'true';
    
    // If the user is a retailer, allow access
    if (!isRetailer) {
      this.router.navigate(['/retailer-login']); // Redirect to home page if not a retailer
      return false;
    }
    
    // If not a retailer, redirect to the home page or show an error
    return true;
  }
}
