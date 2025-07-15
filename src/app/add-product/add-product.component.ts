import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { of } from 'rxjs';
@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  name = '';
  description = '';
  price: number = 0;
  categoryId: number = 0;
  IsAvailable = true;
  image: File[] = [];
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => {this.categories = res;});
  }

  onFileChange(event: any) {
    this.image = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('categoryId', this.categoryId.toString());
    formData.append('isAvailable', this.IsAvailable.toString());

    for(let image of this.image) {
      formData.append('image', image)
    };

    this.http.post('http://localhost:7218/api/Product/upload', formData).subscribe({
      next: () => alert('Product added successfully!'),
      error: (err) => alert('Error adding product: ' + err.message),
    })   
  }
}
