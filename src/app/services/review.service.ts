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

 	// Use this if there are already other reviews available for that artist
 	addAnotherReviewForArtist(artist_id, objectToAdd): void {
 		const items = this.af.database.list('reviews');
 		// Note, this will replace the previous review made by this userID
 		items.update(artist_id, objectToAdd);
 	}

 	// Use this if this is the first review for a artist. The format of objectToAdd
 	// should already be correct according to  firebase once this function is called.
 	addFirstReviewForArtist(objectToAdd): void {
 		const items = this.af.database.list('reviews');
 		items.push(objectToAdd);
 	}
}
