import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = []; 
  private CartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.CartCount.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cartItems');
   if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.CartCount.next(this.cartItems.length);
    }
  }

  addToCart(product: any): void {
      if(!product || !product.id) {
        console.error('Invalid item', product);
        return;
      }

      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

        this.saveCart();
  }

  removeFromCart(itemId: number): void {
    const cart = this.cartItems.filter(item => item.id !== itemId);
    this.saveCart();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const product = this.cartItems.find(item => item.id === itemId);
    if(product && quantity > 0) {
      product.quantity = quantity;
    } else if (product && quantity === 0) {
      this.removeFromCart(itemId);
    }
    this.saveCart();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
  
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
