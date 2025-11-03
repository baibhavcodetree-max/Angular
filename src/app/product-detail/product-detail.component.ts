import { Component , OnInit, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product!: any;
  productId!: number;

  currentIndex: number = 0; // वर्तमान में दिखाई जा रही इमेज का इंडेक्स
  defaultPlaceholder = 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image';

  CartService: CartService = inject(CartService);

  constructor(public route: ActivatedRoute, private httpclient:HttpClient,public router:Router, public Product : ProductService) {}

  ngOnInit() : void {
     this.productId = Number(this.route.snapshot.paramMap.get('id'));  

      this.Product.getProductById(this.productId).subscribe({
        next:(data) => {
          this.product = data;
          console.log(this.product);
        },
        error:(err) => {
          alert('Failed to load product details' + err.message);
        }
      });
  }

  buynow(product: any){
    this.CartService.addToCart(product);
  }

  prevImage(): void {
    if (!this.product || !this.product.images || this.product.images.length === 0) 
      return;

    this.currentIndex = 
      (this.currentIndex === 0) 
        ? this.product.images.length - 1 // अगर पहली इमेज पर हैं, तो आखिरी पर जाएँ
        : this.currentIndex - 1; // वरना, इंडेक्स को 1 से कम करें
  }

  nextImage(): void {
    if (!this.product || !this.product.images || this.product.images.length === 0) return;

    this.currentIndex = 
      (this.currentIndex === this.product.images.length - 1) 
        ? 0 // अगर आखिरी इमेज पर हैं, तो पहली पर जाएँ
        : this.currentIndex + 1; // वरना, इंडेक्स को 1 से बढ़ाएँ
  }

  getCurrentImageUrl(): string {
    if (this.product && this.product.images && this.product.images.length > this.currentIndex) {
      return this.product.images[this.currentIndex];
    }
    return this.defaultPlaceholder;
  }
}
