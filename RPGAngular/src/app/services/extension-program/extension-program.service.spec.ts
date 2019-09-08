import { TestBed } from '@angular/core/testing';

import { ExtensionProgramService } from './extension-program.service';

describe('ExtensionProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtensionProgramService = TestBed.get(ExtensionProgramService);
    expect(service).toBeTruthy();
  });
});
