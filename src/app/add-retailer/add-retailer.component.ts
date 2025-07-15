import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-retailer',
  standalone: false,
  templateUrl: './add-retailer.component.html',
  styleUrl: './add-retailer.component.css'
})

export class AddRetailerComponent {

  email: string = '';
  showOtpInput: boolean = false;
  Otp: string = '';
  message: string = '';
  errorMessage: string = '';
  otpVerified: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}
  
  registerAsRetailer() {
    const email = JSON.parse(localStorage.getItem('user') || '""');

    if (!email) {
      alert('Please login first');
      this.router.navigate(['/login-page']);
      return;
    };

    this.http.put(`https://localhost:7218/api/User/upgrade-to-retailer?email=${email}`, {})
    .subscribe({
      next: () => {
        localStorage.setItem('isRetailer', 'true');
        this.message = 'You are now a retailer!';
        setTimeout(() => this.router.navigate(['/retailer-interface']), 2000); // Redirect after 2 seconds
      },

      error: err => {
        alert('Error registering retailer:' + err.message);
      }
    });
  }

 sendOtp() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    alert('Please login first');
    this.router.navigate(['/login-page']);
    return;
  }

  this.email = JSON.parse(storedUser);

  this.http.post(`https://localhost:7218/api/User/send-otp?email=${ this.email }`,{})
    .subscribe({
      next: () => {
        this.showOtpInput = true;
        this.otpVerified = true;
        this.message = 'OTP sent to your email!';
      },
      error: err => {
        this.errorMessage = 'Error sending OTP: ' + err.message;
      }
    });
 }

 verifyOtp() {
  this.http.post(`https://localhost:7218/api/User/verify-otp?email=${this.email}&otp=${this.Otp}`, {})
    .subscribe({
      next: () => {
        this.otpVerified = true;
        this.message = 'OTP verified successfully!';
      },
      error: err => {
        this.errorMessage = 'Error verifying OTP: ' + err.message;
      }
    });
 }
}
