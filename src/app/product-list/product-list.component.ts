import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  Products:Product[] = [];
  constructor(private productservice: ProductService, private router: Router) {}

  ngOnInit(): void 
  {
    this.productservice.getAllProducts().subscribe(
      res => {this.Products = res;
    });
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: number): void {
    if(confirm('Are You sure you want to delete this product?'))
    {
      this.productservice.deleteProduct(productId).subscribe({
        next:() =>{
          alert('Product deleted.');
          this.ngOnInit();
        },
        error:(err) => {
          alert('delete failed' + err.message);
        }
      });
    }
  }
}
