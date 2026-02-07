import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesshourComponent } from './businesshour.component';

describe('BusinesshourComponent', () => {
  let component: BusinesshourComponent;
  let fixture: ComponentFixture<BusinesshourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinesshourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesshourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
