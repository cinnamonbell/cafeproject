import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpViewReviewsComponent } from './emp-view-reviews.component';

describe('EmpViewReviewsComponent', () => {
  let component: EmpViewReviewsComponent;
  let fixture: ComponentFixture<EmpViewReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpViewReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpViewReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
