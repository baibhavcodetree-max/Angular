import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerInterfaceComponent } from './retailer-interface.component';

describe('RetailerInterfaceComponent', () => {
  let component: RetailerInterfaceComponent;
  let fixture: ComponentFixture<RetailerInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetailerInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
