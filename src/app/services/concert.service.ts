import { Injectable }                       from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Services provide things that we want to use on several locations in our app. For example we might want to use a list of
// users or concerts on multiple places.
@Injectable()
export class ConcertService {
  private apiUrl = 'http://api.eventful.com/json/events/search?';  // URL to Eventful API
  private apiKey = '2t89BH4xkbpwCHzs'; // API Key

  private headers = new Headers();

  constructor(private http: Http) { }

  // To get CORS to work, install Moesif Origin & CORS Changer plugin for chrome and set 
  // Access-Control-Allow-Credentials to true in options
  // date is an optional parameter
  getConcerts(location, date = 'All') {
    this.apiUrl = this.apiUrl + 'q=music&location=' + location + '&date' + date;
    // Append app_key
    this.apiUrl = this.apiUrl + '&app_key=' + this.apiKey;
    return this.http.get(this.apiUrl)
    .map(res => res.json());
  }

}
