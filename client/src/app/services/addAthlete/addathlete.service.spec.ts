import { TestBed, inject } from '@angular/core/testing';

import { AddathleteService } from './addathlete.service';

describe('AddathleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddathleteService]
    });
  });

  it('should be created', inject([AddathleteService], (service: AddathleteService) => {
    expect(service).toBeTruthy();
  }));
});
