import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiurl = `${environment.apiUrl}/api/Product`;

  

  constructor(private http : HttpClient) { }

  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  getProductsByCategories(categoryId:number):Observable<Product[]>{
    debugger
    return this.http.get<Product[]>(`${this.apiurl}/category/${categoryId}`)
  }

  getProductById(productId: number): Observable<Product> {
     return this.http.get<Product>(`${this.apiurl}/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiurl}/${product.id}`, product);
  }

  getProductRelatedByslug(slug: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiurl}/slug/${slug}/related`);
  }
}

