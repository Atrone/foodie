import { TestBed } from '@angular/core/testing';

import { TimHortonsSaugeenMaitlandService } from './tim-hortons-saugeen-maitland.service';

describe('TimHortonsSaugeenMaitlandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimHortonsSaugeenMaitlandService = TestBed.get(TimHortonsSaugeenMaitlandService);
    expect(service).toBeTruthy();
  });
});
