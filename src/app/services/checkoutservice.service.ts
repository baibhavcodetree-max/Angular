import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CheckoutserviceService {

  private baseurl = /*`${environment.apiUrl}*/'https://localhost:51373/api/Orders';

  constructor(private http: HttpClient) { }

  placeOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.baseurl}/placeorder`, orderDetails);
  }

  getOrderStatus(userId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/user/${userId}`);
  }
  
}
