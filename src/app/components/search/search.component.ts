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
  // Contains All the results with no filter active
  results = [];
  artists = [];
  artistName = undefined;
  searchTerm = '';
  lat: number;
  lng: number;
  // 1 = all, 2 = artist and so on. All is selected by default
  toggledFilter;
  // Contains the results from the search depending on filter.
  filteredResults = [];

  constructor(private spotifyService: SpotifyService, private concertService: ConcertService, 
    private route: ActivatedRoute) { 
    super(true);
  }

  ngOnInit() { 


    this.route.params.subscribe(params => {
      this.results = [];
      this.standby();
      this.searchTerm = params['location'];

      this.searchArtistsByName();
      this.searchConcertsByLocation();
      this.searchConcertsByArtist();
      // No filter is standard
      this.noFilter(1);
      


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
     
    });
    

 


  }

  private searchArtistsByName() {
     // Get artists by query
     this.spotifyService.searchArtists(this.searchTerm).subscribe(
        data => {
          this.artists = data.artists.items;
          console.log(data.artists);
        }
      );
  }

  private searchConcertsByLocation() {
    // Get concerts by location for query
     this.concertService.getLocation(this.searchTerm).subscribe(
        data => {
          //this.results = data.events ? data.events.event : [];
          this.lat = data.resultsPage.results.location ? data.resultsPage.results.location[0].city.lat : null;
          this.lng = data.resultsPage.results.location ? data.resultsPage.results.location[0].city.lng : null;
          console.log(data);
          if(this.lat != null && this.lng != null) {
            this.concertService.getConcerts(this.lat, this.lng)
            .subscribe(
              data => {
                if(data.resultsPage.results) {
                  this.results.push.apply(this.results, data.resultsPage.results.event);
                }
                //this.results += data.resultsPage.results.event ? data.resultsPage.results.event : [];
                console.log(this.results);
                this.ready();
              }
            );
          } else {
             this.ready();
            // TODO No results
          }
        }
      );
  }

  private searchConcertsByArtist() {
    this.concertService.getArtistsByName(this.searchTerm).subscribe(
      data => {
        let id = data.resultsPage.results.artist[0].id;
        this.concertService.getConcertsByArtistId(id).subscribe(
          data => {
            if(data.resultsPage.results) {
              this.results.push.apply(this.results, data.resultsPage.results.event);
            }
            //this.results = data.resultsPage.results.event ? data.resultsPage.results.event : [];
            this.artistName = this.searchTerm;
          }
        );
      }
    );
  }

  noFilter(number) {
    this.toggledFilter = number;
    this.filteredResults = this.results;
  }

  filterArtist(number) {
    this.changeFilterToogle(number);
    let upperCaseSearchTerm = this.searchTerm.toUpperCase();
    this.filteredResults = this.results.filter((result) => {
      for (var i = 0; i < result.performance.length; i++) {
        let artistName = result.performance[i].artist.displayName.toUpperCase();
        if (artistName.includes(upperCaseSearchTerm)) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  filterCity(number) {
    this.changeFilterToogle(number);
    let upperCaseSearchTerm = this.searchTerm.toUpperCase();
    this.filteredResults = this.results.filter((result) => {
      let city = result.location.city.toUpperCase();
      if (city.includes(upperCaseSearchTerm)) {
        return true;
      } else {
        return false;
      }
    });
  }

  filterVenue(number) {
    this.changeFilterToogle(number);
    let upperCaseSearchTerm = this.searchTerm.toUpperCase();
    this.filteredResults = this.results.filter((result) => {
      let venue = result.venue.displayName.toUpperCase();
      if (venue.includes(upperCaseSearchTerm)) {
        return true;
      } else {
        return false;
      }
    });
  }


  changeFilterToogle(number) {
    this.toggledFilter = number;
  }

}
