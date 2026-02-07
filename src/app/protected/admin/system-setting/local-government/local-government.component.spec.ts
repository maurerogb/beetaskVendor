import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalGovernmentComponent } from './local-government.component';

describe('LocalGovernmentComponent', () => {
  let component: LocalGovernmentComponent;
  let fixture: ComponentFixture<LocalGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalGovernmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
