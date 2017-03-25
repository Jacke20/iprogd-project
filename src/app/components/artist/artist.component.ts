import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { SpotifyService }    from "../../services/spotify.service";
import { ConcertService }    from "../../services/concert.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService, ConcertService]
})
export class ArtistComponent implements OnInit {
  artist = {};
  topTracks = [];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotifyService.getArtistInformation(params['id']).subscribe(
        data => this.artist = data
      );

      this.spotifyService.getTopTracksByArtist(params['id']).subscribe(
        data => this.topTracks = data.tracks
      );

      this.spotifyService.getTopTracksByArtist(params['id']).subscribe(
        data => console.log(data)
      );


       this.spotifyService.getArtistInformation(params['id']).subscribe(
        data => console.log(data)
      );
    });
  }

  playSong(id) {
    var audio = new Audio();
    audio.src = document.getElementById(id).getAttribute('src');
    audio.load();
    audio.play();
  }

  pauseSong(id) {
    // TODO
  }

}
