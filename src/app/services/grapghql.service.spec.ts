import { TestBed } from '@angular/core/testing';

import { GrapghqlService } from './grapghql.service';

describe('GrapghqlService', () => {
  let service: GrapghqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrapghqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
