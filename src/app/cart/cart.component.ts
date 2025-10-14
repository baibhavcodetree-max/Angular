import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

  productId!: number;
  product!: any;
  // quantity: number=1;

  constructor(public route: ActivatedRoute,private httpclient:HttpClient,public router:Router) {}

  ngOnInit(): void {
    const state = window.history.state;

    if(state && state.Product) {
      this.product = state.Product;
      console.log('Product in cart:', this.product);
    }
  }

  quantity = signal(1);

  placeOrder(){
    this.router.navigate(['/checkout'], { state: {Product: this.product} });
  }
}  
