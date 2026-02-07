import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsidebarComponent } from './vendorsidebar.component';

describe('VendorsidebarComponent', () => {
  let component: VendorsidebarComponent;
  let fixture: ComponentFixture<VendorsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
