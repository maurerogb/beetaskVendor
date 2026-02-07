import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSignupEndComponent } from './vendor-signup-end.component';

describe('VendorSignupEndComponent', () => {
  let component: VendorSignupEndComponent;
  let fixture: ComponentFixture<VendorSignupEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSignupEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSignupEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
