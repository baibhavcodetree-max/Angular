import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiurl}/${productId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiurl}/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiurl}/${product.ProductId}`, product);
  }
}
