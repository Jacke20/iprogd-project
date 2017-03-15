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

  constructor(public http: Http) { 
    this.headers.append('client_id', this.client_id);
    this.headers.append('client_secret', this.client_secret);
  }

  getAlbumsForArtist(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id + '/albums';
    this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .subscribe(
      value => console.log(value),
      error => console.log(<any>error),
      () => console.log('Spotify API request complete')
    );
  }

  getArtistInformation(artist_id) {
    this.apiUrl = 'https://api.spotify.com/v1/artists/' + artist_id;
    this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .subscribe(
      value => console.log(value),
      error => console.log(<any>error),
      () => console.log('Spotify API request complete')
    );
  }

  searchArtists(artist_name) {
    this.apiUrl = 'https://api.spotify.com/v1/search?q=' + artist_name + '*&type=artist';
    this.http.get(this.apiUrl, this.headers)
    .map(res => res.json())
    .subscribe(
      value => console.log(value),
      error => console.log(<any>error),
      () => console.log('Spotify API request complete')
    );
  }

}
