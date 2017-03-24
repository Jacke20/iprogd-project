// Component that displays an album by a artist and a list of tracks.
// Users can click tracks and listen to a preview

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute }    from '@angular/router';
import { SpotifyService }    from "../../services/spotify.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
  albums = [];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotifyService.getAlbumsForArtist(params['id']).subscribe(
        data => this.albums = data.items
      );


      this.spotifyService.getAlbumsForArtist(params['id']).subscribe(
        data => console.log(data)
      );
    });
  }

}
