import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  
  productId: number = 0;

  product: Product = {
    ProductId: 0,
    name: '',
    description: '',
    price: 0,
    CategoryId: 0,
    IsAvailable: true,
    ProductImage: [],
  };

  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        alert('Error fetching product details: ' + err.message);
      }
    });

    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        alert('Error fetching categories: ' + err.message);
      }
    });
  }

  onUpdate(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        alert('Product updated successfully.');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Update failed: ' + err.message);
      }
    });
  }

}
