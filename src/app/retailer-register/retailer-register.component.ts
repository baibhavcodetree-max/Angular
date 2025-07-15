import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retailer-register',
  standalone: false,
  templateUrl: './retailer-register.component.html',
  styleUrl: './retailer-register.component.css'
})

export class RetailerRegisterComponent {
  message: string = '';

  constructor(private http:HttpClient,private router:Router) {}

  onRegister() {
    this.router.navigate(['/add-retailer']);
  }
}
