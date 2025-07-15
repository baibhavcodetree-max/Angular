import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent {
  Product!: Product;

  constructor(public route: ActivatedRoute, private productService: ProductService) {}
  // ngOnInIt() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productService.getById(id).subscribe(data => this.Product = data);
  // }
}
