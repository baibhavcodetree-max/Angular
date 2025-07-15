import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../models/login-dto';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService 
{
  private apiUrl = `${environment.apiUrl}/api/Auth`; 

  constructor(private http:HttpClient, private router: Router) {}
  // Define the API URL for login and registration
  Login(LoginData:LoginDTO, rememberMe:boolean): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/login`, LoginData).pipe(
      tap((response:any) => {
        if (rememberMe) {
        localStorage.setItem('token', response.token);
        }
        else{
          sessionStorage.setItem('token', response.token); // Store the token in session storage if not remembering
        } // Store the token in local storage
        localStorage.setItem('isRetailer', response.isRetailer); // Store the retailer status in local storage
      })
    );
  }

  Register(userData:any): Observable<any>
  {
    // Define the API URL for registration
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    if (localStorage.getItem('token')) {
    localStorage.removeItem('token'); 
    }
    else{
      sessionStorage.removeItem('token');
    }// Remove the token from local storage
    this.router.navigate(['/login-page']); // Navigate to the login page
  }
}
