import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product!: any;
  productId!: number;

  constructor(public route: ActivatedRoute, private httpclient:HttpClient,public router:Router) {}

  ngOnInit() : void {
     this.productId = Number(this.route.snapshot.paramMap.get('id'));  

      this.httpclient.get(`https://fakestoreapi.com/products/${this.productId}`).subscribe(data => {
        this.product = data;
      });
  }

  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productService.getById(id).subscribe(data => this.Product = data);

  buynow(product: any){
    this.router.navigate(['/cart'], { state: {Product: product} });
  }
}
