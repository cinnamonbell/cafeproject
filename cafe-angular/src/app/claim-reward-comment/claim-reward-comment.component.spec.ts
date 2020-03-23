import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRewardCommentComponent } from './claim-reward-comment.component';

describe('ClaimRewardCommentComponent', () => {
  let component: ClaimRewardCommentComponent;
  let fixture: ComponentFixture<ClaimRewardCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimRewardCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimRewardCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
