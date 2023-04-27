import { TestBed } from '@angular/core/testing';

import { KodnestService } from './kodnest.service';

describe('Luv2ShopFormService', () => {
  let service: KodnestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KodnestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
