import { TestBed } from '@angular/core/testing';

import { ImageTempGeneratorService } from './image-temp-generator.service';

describe('ImageTempGeneratorService', () => {
  let service: ImageTempGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageTempGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
