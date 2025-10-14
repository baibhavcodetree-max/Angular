import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {

  userId = 0; // (Get this dynamically from auth service)
  product!: any;
  quantity = 1;

  order = {
    userId: 0,
    productId: 0,
    quantity: 1,
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: '',
    deliveryAddress: ''
  };
 
 

  constructor(private router: Router, private auth : AuthService, private checkoutservice: CheckoutserviceService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { Product: any };

    if (state && state.Product) {
    this.product = state.Product; // 👈 this is crucial
    console.log("Received product:", state.Product);
    } else {
      console.warn("No product received from cart!");
    }

    this.userId = this.auth.getUserId() ?? 0;
    this.order.productId = this.product?.id || 0;
  }

  onSubmit() {

    if(!this.product){
      alert('No product found for checkout.');
      return;
    }

    this.order = {
      userId: this.userId,
      productId: this.product.id,
      quantity: this.quantity,
      fullName: this.order.fullName,
      address: this.order.address,
      city: this.order.city,
      pincode: this.order.pincode,
      phone: this.order.phone,
      paymentMethod: this.order.paymentMethod === 'gpay' ? 'GPay' : 'Cash on Delivery',
      deliveryAddress: `${this.order.address}, ${this.order.city}, ${this.order.pincode}`
    };

    // Step 1: Send order to backend
    this.checkoutservice.placeOrder(this.order).subscribe({
      next: (response) => {
        console.log('Order placed successfully', response);

        // Step 2: Handle payment after order creation
        if (this.order.paymentMethod === 'gpay') {
          this.redirectToGPay(response.totalAmount || this.product.totalAmount); // Pass amount to GPay
        } else if (this.order.paymentMethod === 'cod') {
         swal.fire({
            title: '🎉 Order Placed!',
            html: `
              <p>${response.message}</p>
              <p><b>Order ID:</b> ${response.orderId}</p>
              <p><b>Total Amount:</b> ₹${response.totalAmount}</p>
              <p><b>Expected Delivery:</b> ${new Date(response.expectedDelivery).toDateString()}</p>
            `,
            icon: 'success',
            confirmButtonText: 'View My Orders',
            confirmButtonColor: '#3085d6',
            background: '#f9f9f9',
            backdrop: `rgba(0,0,0,0.4)`
          }).then(() => {
            this.router.navigate(['/orders']);
          });
          this.router.navigate(['/order-confirmation']);
        } else {
          alert('Proceeding to card payment (not integrated yet)');
        }
      },

      error: (error) => {
        console.error('Error placing order', error);
        swal.fire({
            title: '❌ Failed!',
            text: 'Something went wrong while placing the order. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
          });
      }
    });
  }

    redirectToGPay(amount: number) {
      // ✅ This is how you can trigger Google Pay UPI intent
      const upiLink = `upi://pay?pa=merchant@okaxis&pn=EcomStore&am=${this.product.totalamount}&cu=INR&tn=EcomPurchase`;
      window.location.href = upiLink;
    }

}
