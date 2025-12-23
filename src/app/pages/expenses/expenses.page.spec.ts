import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePage } from './expenses.page';

describe('Tab2Page', () => {
  let component: ExpensePage;
  let fixture: ComponentFixture<ExpensePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
