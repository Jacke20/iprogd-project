import { Component, OnInit } from '@angular/core';
import { ConcertService }    from '../../services/concert.service';
import { SpotifyService }    from '../../services/spotify.service';
import { ActivatedRoute }    from '@angular/router';

import { Loading }           from '../../classes/loading';



@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent extends Loading implements OnInit {
  concert: {};
  artist: {};
  id: number;
	title: string = 'My first angular2-google-maps project';
	lat: number = 51.678418; // byt dessa till koordinater för själva eventet
	lng: number = 7.809007;

  constructor(private concertService: ConcertService, private route: ActivatedRoute, private spotifyService: SpotifyService) {
  	super(true);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.standby();

      this.concertService.getConcertDetails(params['id']).subscribe(
        data => {
          console.log(data);
          this.lat = data.resultsPage.results.event.location ? data.resultsPage.results.event.location.lat : null;
          this.lng = data.resultsPage.results.event.location ? data.resultsPage.results.event.location.lng : null;
          this.concert = data.resultsPage.results.event;

          // Get artist for concert
          this.spotifyService.searchArtists(data.resultsPage.results.event.performance[0].artist.displayName).subscribe(
            data => {
              this.spotifyService.getArtistInformation(data.artists.items[0].id).subscribe(
                data => {
                    this.artist = data;
                    this.id = data.id;
                    console.log(this.artist);
                    this.ready();
                  }
              );
            }
          );
        }
      );
    });
  }

}
