import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ActivatedRoute,ParamMap } from '@angular/router';
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
  categoryId!: number;

  constructor(private productservice: ProductService, private router: Router, private cart:CartService,private ActivatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('category')!);
      this.loadProductsbyslug(this.categoryId)
    })
  }

  loadProductsbyslug(categoryId:number){
     this.Product.getProductsByCategories(categoryId).subscribe({
      next:(data:any[]) => {
        this.Products = data;
        console.log(this.Products)
      }
     })
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
