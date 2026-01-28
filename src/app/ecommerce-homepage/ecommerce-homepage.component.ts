import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-ecommerce-homepage',
  standalone: false,
  templateUrl: './ecommerce-homepage.component.html',
  styleUrls: ['./ecommerce-homepage.component.css']
})
export class EcommerceHomepageComponent implements AfterViewInit {
  constructor(private authService: AuthService) { }
  onLogOut(): void {
    this.authService.logout(); // Call the logout method from AuthService

  }
  ngAfterViewInit(): void {
    debugger;
    // Initialize Swiper after view is initialized
   const swiperEl = document.querySelector('#heroSwiper') as any;

    if (!swiperEl) return;
    Object.assign(swiperEl, {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      }
    });

    swiperEl.initialize();
  }
}