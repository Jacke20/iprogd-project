import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { SpotifyService }    from "../../services/spotify.service";
import { ConcertService }    from "../../services/concert.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService, ConcertService] // TODO: Remove SpotifyService
})
export class SearchComponent implements OnInit {
  results = [];
  searchTerm = '';

  constructor(private spotifyService: SpotifyService, private concertService: ConcertService, 
    private route: ActivatedRoute) { }

  ngOnInit() { 

    this.route.params.subscribe(params => {
      this.searchTerm = params['location'];

      this.concertService.getConcerts(this.searchTerm, 'date').subscribe(
        data => this.results = data.events ? data.events.event : []
      );
    });

  }

}
