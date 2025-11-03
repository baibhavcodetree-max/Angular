import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService} from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {

  @Input () Product:any
  Products:any[] = [];
  isLoading: boolean = true;

  constructor(private productservice: ProductService, private router: Router, private cart:CartService) {}

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe({
      next:(data) => {
        this.Products = data,
        this.isLoading = false;
      },
      error:(err) => {
        alert('Failed to load products' + err.message);
        this.isLoading = false;
      }
    });
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-details/', productId]);
  }

  addToCart(product: any): void {
    this.cart.addToCart({...product, quantity: 1 });
    alert('Product added to cart!');
  }

  }
