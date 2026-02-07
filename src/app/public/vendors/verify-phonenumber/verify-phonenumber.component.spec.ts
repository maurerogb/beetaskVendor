import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPhonenumberComponent } from './verify-phonenumber.component';

describe('VerifyPhonenumberComponent', () => {
  let component: VerifyPhonenumberComponent;
  let fixture: ComponentFixture<VerifyPhonenumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPhonenumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPhonenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
