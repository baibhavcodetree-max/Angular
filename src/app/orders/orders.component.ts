import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  apiUrl = environment.apiUrl;

  orders: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const user = this.auth.getCurrentUser();
    const userId = user.id;

    if (!userId) {
      console.error('User ID not found. User might not be logged in.');
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/api/Orders/userId/${userId}`)
      .subscribe({
        next : (data) => { 
          this.orders = data;
          console.log(data)
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        }
      });
  }

}
