import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardLinkComponent } from './dashboard-link.component';

describe('DashboardLinkComponent', () => {
  let component: DashboardLinkComponent;
  let fixture: ComponentFixture<DashboardLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DashboardLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
