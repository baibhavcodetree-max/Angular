import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showDropdown = false;
  isRetailer = false; // Default value, can be set based on user role
  isAuthenticated = false; // Default value, can be set based on authentication status
  
 constructor(private authService: AuthService, private router:Router) { }

 ngOnInit(): void {
   this.isRetailer = localStorage.getItem('isRetailer') === 'true';
  }

  onLogOut(): void {
    this.authService.logout(); // Call the logout method from AuthService
    // Optionally, you can add any additional logic here after logging out
  }
}
