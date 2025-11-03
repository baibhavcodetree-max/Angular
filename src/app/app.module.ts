import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EcommerceHomepageComponent } from './ecommerce-homepage/ecommerce-homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RetailerRegisterComponent } from './retailer-register/retailer-register.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddRetailerComponent } from './add-retailer/add-retailer.component';
import { RetailerInterfaceComponent } from './retailer-interface/retailer-interface.component';
import { ChatComponent } from './chat/chat.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EcommerceHomepageComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailComponent,
    AddProductComponent,
    EditProductComponent,
    RetailerRegisterComponent,
    SellerDashboardComponent,
    AddRetailerComponent,
    RetailerInterfaceComponent,
    ChatComponent,
    CheckoutComponent,
    CartComponent,
    OrdersComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
