import { Injectable } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class ReviewService {
	reviews: FirebaseListObservable<any>;

  	constructor(public af: AngularFire) {}

  	getReviewsForArtist(artist_id): FirebaseListObservable<any> {
  		this.reviews = this.af.database.list('reviews/' + artist_id);
  		return this.reviews;
 	} 

}
