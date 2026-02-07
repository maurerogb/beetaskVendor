import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulgersComponent } from './bulgers.component';

describe('BulgersComponent', () => {
  let component: BulgersComponent;
  let fixture: ComponentFixture<BulgersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulgersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
