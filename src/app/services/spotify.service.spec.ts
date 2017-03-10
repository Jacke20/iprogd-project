import { TestBed, inject } from '@angular/core/testing';

import { SpotifyService } from './spotify.service';

describe('SongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyService]
    });
  });

  it('should ...', inject([SpotifyService], (service: SpotifyService) => {
    expect(service).toBeTruthy();
  }));
});
