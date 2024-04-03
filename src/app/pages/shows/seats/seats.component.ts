import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../../../shared/services/shows.service';
import { Show } from '../../../shared/models/Show';
import { Seat } from '../../../shared/models/Seat';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent implements OnInit{

  selectedShow: Show | null = null;

  constructor(private showsService: ShowsService) {}

  ngOnInit() {
    this.showsService.getSelectedShow().subscribe(show => {
      this.selectedShow = show;
    });
  }

  selectedSeatIndexArray: number[] = [];

selectSeat(index: number) {
  this.selectedSeatIndexArray.push(index);
}
}
