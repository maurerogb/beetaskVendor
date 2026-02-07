import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDealComponent } from './order-deal.component';

describe('OrderDealComponent', () => {
  let component: OrderDealComponent;
  let fixture: ComponentFixture<OrderDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
