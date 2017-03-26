import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Loading }           from '../../classes/loading';

import { SpotifyService }    from "../../services/spotify.service";
import { ConcertService }    from "../../services/concert.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService, ConcertService] // TODO: Remove SpotifyService
})
export class SearchComponent extends Loading implements OnInit {
  results = [];
  searchTerm = '';

  constructor(private spotifyService: SpotifyService, private concertService: ConcertService, 
    private route: ActivatedRoute) { 
    super(true);
  }

  ngOnInit() { 


    this.route.params.subscribe(params => {
      this.standby();
      this.searchTerm = params['location'];

/*
       this.concertService.getVenue(this.searchTerm).subscribe(
        data => {
          var id = data.Venues[0].Id;
          this.concertService.getConcertsByVenueId(id).subscribe(
            data => {
              this.results = data.Events ? data.Events : []
              this.ready();
            }
          );
        }
      );

      */

       this.concertService.getConcerts(this.searchTerm, 'date').subscribe(
      data => {
        this.results = data.events ? data.events.event : [];
        this.ready();
      }
    );
      
    });
    

 


  }

}
