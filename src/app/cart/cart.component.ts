import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartService]
})

export class CartComponent implements OnInit{

  product!: any;
  cartItems: any[] = [];
  
  constructor(public route: ActivatedRoute,public router:Router, public cart:CartService) {}

  quantity = signal(1);

  ngOnInit(): void {
    this.cartItems = this.cart.getCartItems();
  }

  removefromCart(id: number): void {
    this.cart.removeFromCart(id);
    this.cartItems = this.cart.getCartItems();
  }

  placeOrder(){
    this.router.navigate(['/checkout'], { state: {Product: this.product} });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => {
      const qty = item.quantity || 1;
      return sum + item.price * qty;
    }, 0);
 }
 
}  
