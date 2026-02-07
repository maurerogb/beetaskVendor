import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundLogComponent } from './refund-log.component';

describe('RefundLogComponent', () => {
  let component: RefundLogComponent;
  let fixture: ComponentFixture<RefundLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
