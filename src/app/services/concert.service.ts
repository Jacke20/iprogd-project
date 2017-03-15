import { Injectable }                       from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Services provide things that we want to use on several locations in our app. For example we might want to use a list of
// users or concerts on multiple places.
@Injectable()
export class ConcertService {
  private apiUrl = 'http://api.eventful.com/json/events?';  // URL to Eventful API
  private apiKey = 'bvNNtt52wBxVQ4Q8'; // API Key

  private headers = new Headers();

  constructor(public http: Http) { 
    this.headers.append('app_key', this.apiKey);
  }

  getConcerts(location) {
    this.apiUrl = this.apiUrl + 'q=music&l=' + location;
    this.apiUrl = 'http://api.eventful.com/json/events/search?location=San+Diego';
    this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .subscribe(
      value => console.log(value),
      error => console.log(<any>error),
      () => console.log('Eventful API request complete')
    );
  }

}
