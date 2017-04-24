import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { SpotifyService }    from "../../services/spotify.service";
import { ConcertService }    from "../../services/concert.service";
import { ReviewService } from '../../services/review.service';
import { AuthService } from "../../services/auth.service";

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { Loading }              from "../../classes/loading";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService, ConcertService, ReviewService]
})
export class ArtistComponent extends Loading implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  // Om du lyckas få det att fungera med bara userInfo = {} så go right ahead
  // Lägger in dummyvärden som skrivs över på init för att dis shit e dumb
  userInfo = {uid: "-1", displayName: "ha"};
  artist = {name: null};
  topTracks = [];
  audios = [];
  reviews = [];
  events = [];
  showWriteReview: boolean;
  averageScore: number; // Rounded average score of the artist
  playingID: number;
  userRating: number; // the score that the current user has given the artist
  artistID: number;
  isFavourite: boolean;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService,
    private reviewService: ReviewService, private authService: AuthService,
    private concertService: ConcertService) {
      super(true, 3);
  }

  ngOnInit() {
    this.showWriteReview = false; // Not shown by default
    this.authService.af.auth.takeUntil(this.ngUnsubscribe).subscribe(auth => {
      if (this.authService.isAuthenticated()) {
         // kan inte sätta this.user = auth eftersom den INSISTERAR att user inte har ett "google"-fält
         // så jag tar bara fram det jag behöver like dis.
         this.userInfo = {uid: auth.uid, displayName: auth.google.displayName};
       }
     });

    this.route.params.takeUntil(this.ngUnsubscribe).subscribe(params => {
      this.artistID = params['id'];
      // Start 2 loading tasks
      this.add_loading(0);
      this.add_loading(1);
      this.add_loading(2);
      this.spotifyService.getArtistInformation(params['id']).subscribe(
        data => {
          this.artist = data;
          this.searchConcertsByArtist(this.artist);
          // Determin if artist is a favourite or not
          if (this.authService.isAuthenticated()) {
            this.reviewService.getArtistFavourite(this.userInfo.uid, data.id).takeUntil(this.ngUnsubscribe).subscribe(snapshot => {
              if (snapshot.val() != null) {
                this.isFavourite = true;
              } else {
                this.isFavourite = false;
              }
            });
          }
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
      this.reviewService.getReviewsForArtist(params['id']).subscribe(
        data => {
          this.reviews = data;
        }
      );*/

      this.reviewService.getReviewsForArtist(params['id']).subscribe(
        data => {
          this.reviews = data;
          this.averageScore = 0;
          for (let i = 0; i < data.length; i++) {
            this.averageScore += Number(data[i].rating);
          }
          this.averageScore = Math.round(this.averageScore/data.length);
          // TODO, check if user has already rated artist and use that as userRating.
          this.loading_ready(2);
        });

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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  updateRating(new_rating) {
    this.userRating = new_rating.rating;
    this.showWriteReview = true;
  } 

  hideWriteReview() {
    this.showWriteReview = false;
  }

  onSubmitReview(value: any) {
    if(this.isAuth()) {
      // TODO: MAKE sure that the user is logged in before submitting review
      let reviewObject = {};
      let reviewObjectUser = {};
      reviewObject[this.userInfo.uid] = {
          content: value.review_text,
          rating: this.userRating,
          reviewer: this.userInfo.displayName,
          title: value.review_title
      }

      reviewObjectUser = {
          artist_id: this.artistID,
          artist_name: this.artist.name,
          content: value.review_text,
          rating: this.userRating,
          title: value.review_title,
      }
      // Use reviewService to add to DB.
      this.reviewService.addReviewForArtist(this.artistID, reviewObject);
      // Add for user as well
      this.reviewService.addReviewForUser(this.userInfo.uid, reviewObjectUser);
      // Get reviews again once new one has been added.
      this.reviewService.getReviewsForArtist(this.artistID).subscribe(
          data => {
            this.reviews = data;
            this.averageScore = 0;
            for (let i = 0; i < data.length; i++) {
              this.averageScore += Number(data[i].rating);
            }
            this.averageScore = Math.round(this.averageScore/data.length);
            // TODO, check if user has already rated artist and use that as userRating.
      });
      // Hide the form
      this.hideWriteReview()
    }
  }

  isPlaying(audios) {
    for(let i = 0; i < audios.length; i++) {
      if(!audios[i].paused) {
        return audios[i];
      }
    }
    return null;
  }

  // Adds the artist as a favourite for the user in the DB
  addFavourite() {
    if(this.isAuth()) {
      this.reviewService.addArtistAsFavourite(this.userInfo.uid, this.artist);
      this.isFavourite = true;
    }
  }

  removeFavourite() {
    if(this.isAuth()) {
    	this.reviewService.removeArtistAsFavourite(this.userInfo.uid, this.artist);
      this.isFavourite = false;
    }
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  // param artist is the artist object
  private searchConcertsByArtist(artist) {
    this.concertService.getArtistsByName(artist.name).subscribe(
      data => {
        let id = data.resultsPage.results.artist ? data.resultsPage.results.artist[0].id : null;
        if(id) {
          this.concertService.getConcertsByArtistId(id).subscribe(
            data => {
              this.events = data.resultsPage.results.event ? data.resultsPage.results.event : [];
            }
          );
        }
      }
    );
  }

}
