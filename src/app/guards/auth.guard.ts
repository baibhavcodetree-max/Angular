import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')? localStorage.getItem('token') : sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      console.log('Token exists, access granted');
      return true;
    } else {
      console.log('No token found, access denied');
      this.router.navigate(['/login-page']);
      return false;
    }
  }
}
