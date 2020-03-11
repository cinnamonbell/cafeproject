import { TestBed } from '@angular/core/testing';

import { ViewRewardsService } from './view-rewards.service';

describe('ViewRewardsService', () => {
  let service: ViewRewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
