import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBannarComponent } from './vendor-bannar.component';

describe('VendorBannarComponent', () => {
  let component: VendorBannarComponent;
  let fixture: ComponentFixture<VendorBannarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorBannarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorBannarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
