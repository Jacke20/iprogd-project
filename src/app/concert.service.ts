import { Injectable } from '@angular/core';

// Services provide things that we want to use on several locations in our app. For example we might want to use a list of
// users or concerts on multiple places.
@Injectable()
export class ConcertService {
  // TODO: Retrieve concerts by API call
  concerts: [string];
  constructor() { }

  // Make use of promises for asynchronous calls (use for API calls later)
  getConerts(): Promise<[string]> {
    return Promise.resolve(this.concerts);

    // Fetch result from this method like this
    /*
      // Pass our callback function as an argument to the Promise's then method
      this.concertService.getConcerts().then(concerts => this.concerts = concerts);
     */
  }

}
