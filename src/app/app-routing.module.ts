import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { EcommerceHomepageComponent } from './ecommerce-homepage/ecommerce-homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { retailerGuard } from './guards/retailer.guard';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RetailerRegisterComponent } from './retailer-register/retailer-register.component';
import { AddRetailerComponent } from './add-retailer/add-retailer.component';
import { RetailerInterfaceComponent } from './retailer-interface/retailer-interface.component';
import { ChatComponent } from './chat/chat.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'products',component:ProductListComponent, canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  {path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  {path:'add-product', component: AddProductComponent, canActivate: [retailerGuard]}, // Add AuthGuard here if needed
  {path: 'login-page', component: LoginPageComponent},
  {path: 'home', component: EcommerceHomepageComponent,canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [retailerGuard]}, // Add AuthGuard here if needed
  {path: 'retailer-interface', component: RetailerInterfaceComponent, canActivate:[retailerGuard]}, // Assuming this is the retailer registration page
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]}, // Assuming this is the cart page
  {path: 'add-retailer', component: AddRetailerComponent, canActivate:[AuthGuard]}, // Assuming this is the retailer registration page
  {path: 'retailer-login', component: RetailerRegisterComponent, canActivate:[AuthGuard]}, // Assuming this is the retailer login page
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}, // Add AuthGuard here if needed
  { path: '', redirectTo: 'login-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
