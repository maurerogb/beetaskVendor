import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderEarningComponent } from './rider-earning.component';

describe('RiderEarningComponent', () => {
  let component: RiderEarningComponent;
  let fixture: ComponentFixture<RiderEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderEarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
