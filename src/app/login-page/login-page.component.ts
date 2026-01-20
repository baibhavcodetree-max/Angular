import { Component, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../models/login-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface user {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}



@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent 
{
  isLogin: boolean = true;
  Login:LoginDTO = {Password: '', Email: ''};
  user : user = { username: '', email: '', password: '', confirmPassword: '' };
  loginerror: string | null = null;
  SuccessMessage: string | null = null;
  rememberMe: boolean = false;


  constructor(private authService: AuthService, @Inject(Router) private router: Router) {}

  toggleForm(showLogin: boolean) 
  {
    this.isLogin = showLogin;
  }

  register() 
  {
    if (!this.user.email || !this.user.username || !this.user.password) 
    {
      this.SuccessMessage = "Please fill in all fields.";
      return;
    }
    
    this.authService.Register(this.user).subscribe({
      next: (res) => {
       Swal.fire("Registration Successful");
        this.isLogin = true; // Switch to login form after successful registration
      },
      error: (err) => {
        alert('Registration Failed: ' + err.error);
      }
    });
  }
  onLogin() 
  {
    const loginData: LoginDTO = { Email: this.Login.Email, Password: this.Login.Password };
    this.authService.Login(loginData, this.rememberMe).subscribe({
      next: (res) => {
        Swal.fire({
          title:"Login Successful",
          icon:"success"
        });// Save token or user details to localStorage if needed
        //localStorage.setItem('user', JSON.stringify(this.Login.Email));
        this.router.navigate(['/home']); // Navigate to home page after successful login
      },
      error: (err) => {
       Swal.fire({
        icon:"error",
        title:"Login Failed"
       })
      }
    });
  }
}
