import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsPage } from './savings.page';

describe('Tab3Page', () => {
  let component: SavingsPage;
  let fixture: ComponentFixture<SavingsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
