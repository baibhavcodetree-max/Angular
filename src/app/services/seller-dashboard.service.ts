import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerDetails } from '../models/seller-Details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {

  private apiUrl = `${environment.apiUrl}/api/seller/dashboard`; // Adjust the URL as needed
  constructor(private http: HttpClient) { }

  getSellerDetails(): Observable<SellerDetails> {
    return this.http.get<SellerDetails>(this.apiUrl);
  }
}
