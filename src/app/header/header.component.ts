import { Component, OnInit, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  isRetailer = false; // Default value, can be set based on user role
  isAuthenticated = false; // Default value, can be set based on authentication status
  cartCount = 0;  
  
 constructor(private authService: AuthService, private router:Router, private cartService: CartService) { }

 ngOnInit(): void {
   this.isRetailer = localStorage.getItem('isRetailer') === 'true';

   this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  onLogOut(): void {
    this.authService.logout(); // Call the logout method from AuthService
    // Optionally, you can add any additional logic here after logging out
  }
}
