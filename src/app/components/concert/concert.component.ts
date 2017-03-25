import { Component, OnInit } from '@angular/core';
import { ConcertService }    from '../../services/concert.service';


@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {
	title: string = 'My first angular2-google-maps project';
	lat: number = 51.678418; // byt dessa till koordinater för själva eventet
	lng: number = 7.809007;

  constructor(private concertService: ConcertService) {
  	
  }

  ngOnInit() {
  }

}
