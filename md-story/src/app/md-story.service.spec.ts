import { TestBed } from '@angular/core/testing';

import { MdStoryService } from './md-story.service';

describe('MdStoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdStoryService = TestBed.get(MdStoryService);
    expect(service).toBeTruthy();
  });
});
