import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-ecommerce-homepage',
  standalone: false,
  templateUrl: './ecommerce-homepage.component.html',
  styleUrls: ['./ecommerce-homepage.component.css']
})
export class EcommerceHomepageComponent {
constructor(private authService: AuthService) { }
onLogOut():void {
  this.authService.logout(); // Call the logout method from AuthService
    
}
}
