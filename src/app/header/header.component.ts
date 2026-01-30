import { Component, OnInit, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showProductsDropdown: boolean = false;
  showDropdown = false;
  isRetailer = false; 
  isAuthenticated = false; 
  cartCount = 0; 
  categories: any[] = []; 
  
  constructor(private authService: AuthService, private router:Router, private cartService: CartService,private Category:CategoryService) { }

  ngOnInit(): void {
    this.isRetailer = localStorage.getItem('isRetailer') === 'true';

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.Category.getAllCategories().subscribe({
        next:(data) => {
          this.categories = data;
          console.log(data)
        }
    });
  }

  onLogOut(): void {
    this.authService.logout(); 
  }
}
