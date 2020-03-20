import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrderCommentComponent } from './cust-order-comment.component';

describe('CustOrderCommentComponent', () => {
  let component: CustOrderCommentComponent;
  let fixture: ComponentFixture<CustOrderCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustOrderCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustOrderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
