import { TestBed } from '@angular/core/testing';

import { CustSignUpService } from './cust-sign-up.service';

describe('CustSignUpService', () => {
  let service: CustSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
