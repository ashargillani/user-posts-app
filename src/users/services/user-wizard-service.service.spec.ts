import { TestBed } from '@angular/core/testing';

import { UserWizardService } from './user-wizard.service';

describe('UserWizardServiceService', () => {
  let service: UserWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
