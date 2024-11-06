import { TestBed } from '@angular/core/testing';

import { MatSnakBarService } from './mat-snak-bar.service';

describe('MatSnakBarService', () => {
  let service: MatSnakBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSnakBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
