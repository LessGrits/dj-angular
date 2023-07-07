import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileDetailsBlockComponent } from './admin-profile-details-block.component';

describe('AdminProfileDetailsBlockComponent', () => {
  let component: AdminProfileDetailsBlockComponent;
  let fixture: ComponentFixture<AdminProfileDetailsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileDetailsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfileDetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
