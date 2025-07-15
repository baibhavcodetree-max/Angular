import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceHomepageComponent } from './ecommerce-homepage.component';

describe('EcommerceHomepageComponent', () => {
  let component: EcommerceHomepageComponent;
  let fixture: ComponentFixture<EcommerceHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcommerceHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
