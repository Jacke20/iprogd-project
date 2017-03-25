import { Injectable }                       from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

// Services provide things that we want to use on several locations in our app. For example we might want to use a list of
// users or concerts on multiple places.
@Injectable()
export class ConcertService {
  private JAMBASEAPIKEY = "d67b3bq3jp28mwbtze4n5avu";
  private baseUrl = 'http://api.eventful.com/json/events/search?';  // Base URL to Eventful API search
  private apiUrl = '';
  private apiKey = '2t89BH4xkbpwCHzs'; // API Key

  private headers = new Headers();

  constructor(private http: Http) { }

  getConcert(id: string) {
    let url = "http://api.jambase.com/events?artistId=2698&page=0&api_key=d67b3bq3jp28mwbtze4n5avu";
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  // To get CORS to work, install Moesif Origin & CORS Changer plugin for chrome and set 
  // Access-Control-Allow-Credentials to true in options
  // date is an optional parameter
  getConcerts(location, sort_order = 'relevance', date = 'Future') {
    this.apiUrl = this.baseUrl + 'q=music&location=' + location + '&date=' + date + '&sort_order=' + sort_order 
    + '&app_key=' + this.apiKey;
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getConcertInfo(id: string) {
    this.apiUrl = 'https://api.eventful.com/json/events/get?id=' + id;
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.log("ERROR");
    // TODO: Place error handling separately
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
