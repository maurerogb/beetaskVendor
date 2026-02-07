import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMenuManagerComponent } from './vendor-menu-manager.component';

describe('VendorMenuManagerComponent', () => {
  let component: VendorMenuManagerComponent;
  let fixture: ComponentFixture<VendorMenuManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMenuManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorMenuManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
