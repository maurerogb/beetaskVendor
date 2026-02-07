import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBannerComponent } from './registration-banner.component';

describe('RegistrationBannerComponent', () => {
  let component: RegistrationBannerComponent;
  let fixture: ComponentFixture<RegistrationBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
