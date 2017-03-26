import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { SpotifyService }    from "../../services/spotify.service";
import { ConcertService }    from "../../services/concert.service";

import { Loading }           from "../../classes/loading";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService, ConcertService]
})
export class ArtistComponent extends Loading implements OnInit {
  artist = {};
  topTracks = [];
  audios = [];
  playingID: number;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { 
    super(true, 2);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Start 2 loading tasks
      this.add_loading(0);
      this.add_loading(1);
      this.spotifyService.getArtistInformation(params['id']).subscribe(
        data => {
          this.artist = data;
          this.loading_ready(0);
        }
      );

      this.spotifyService.getTopTracksByArtist(params['id']).subscribe(
        data => {
          this.topTracks = data.tracks;
          this.loading_ready(1);
        }  
      );

      /*
      this.spotifyService.getTopTracksByArtist(params['id']).subscribe(
        data => console.log(data)
      );
       this.spotifyService.getArtistInformation(params['id']).subscribe(
        data => console.log(data)
      );
      */
    });
  }

  playSong(id) {
    var audio = new Audio();
    this.audios.push(audio);
    audio.src = document.getElementById(id).getAttribute('src');
    audio.load();
    let playing = this.isPlaying(this.audios);
    var playButton = document.getElementById('p' + id);
    var playingPlayButton = document.getElementById('p' + this.playingID);
    if(!playing) {
      this.playingID = id;
      audio.play();
      playButton.innerHTML = 'pause_circle_outline';
    } else if (audio.src == playing.src) {
      this.playingID = null;
      playing.pause();
      playButton.innerHTML = 'play_circle_outline';
    } else {
      this.playingID = id;
      playingPlayButton.innerHTML = 'play_circle_outline';
      playButton.innerHTML = 'pause_circle_outline';
      playing.pause();
      audio.play();
    }
  }

  pauseSong(id) {
    // TODO
  }

  isPlaying(audios) {
    for(let i = 0; i < audios.length; i++) {
      if(!audios[i].paused) {
        return audios[i];
      }
    }
    return null;
  }

}
