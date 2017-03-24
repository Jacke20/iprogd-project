import { Injectable }                       from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService{
  private apiUrl = '';  // URL to Spotify API
  private client_id = '2e18426df1d14a52ba1c7fcea72786b5'; // Your client id
  private client_secret = '39f117f569954787b4b308c6c09acbf8'; // Your secret
  private redirect_uri = 'TODO'; // Your redirect uri

  private headers = new Headers();

  constructor(private http: Http) { 
    this.headers.append('client_id', this.client_id);
    this.headers.append('client_secret', this.client_secret);
  }

  getAlbumsForArtistSimplified(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id + '/albums';
    return this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getAlbumsForArtist(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id + '/albums';
    return this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getTopTracksByArtist(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id + '/top-tracks?country=SE';
    return this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getArtistInformation(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id;
    return this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .catch(this.handleError);
  }

  searchArtists(artist_name) {
    this.apiUrl = 'https://api.spotify.com/v1/search?q=' + artist_name + '*&type=artist';
    return this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
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
