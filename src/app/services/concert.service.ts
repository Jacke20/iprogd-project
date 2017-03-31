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
  private baseUrl = 'http://api.eventful.com/json/events/search?';  // Base URL to Eventful API search
  private apiUrl = '';
  private apiKey = '2t89BH4xkbpwCHzs'; // API Key

  private SONGKICKAPIKEY = 'lghavdojXdj221Uw'; // Songkick API key
  private SONGKICKBASEURL_START = 'http://api.songkick.com/api/3.0/events.json?';
  private SONGKICKBASEURL_END = 'apikey=' + this.SONGKICKAPIKEY;
  

  private headers = new Headers();

  constructor(private http: Http) { }

  getConcerts(lat, lng) {
    this.apiUrl = this.SONGKICKBASEURL_START + 'location=geo:' + lat + ',' + lng + '&' + this.SONGKICKBASEURL_END;
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getConcertDetails(id) {
    this.apiUrl = 'http://api.songkick.com/api/3.0/events/' + id + '.json?' + this.SONGKICKBASEURL_END;
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLocation(query) {
    this.apiUrl = 'http://api.songkick.com/api/3.0/search/locations.json?query=' + query + '&' + this.SONGKICKBASEURL_END;
     return this.http.get(this.apiUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }



  // Eventful methods

  // To get CORS to work, install Moesif Origin & CORS Changer plugin for chrome and set 
  // Access-Control-Allow-Credentials to true in options
  // date is an optional parameter

  /*
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
  */

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
