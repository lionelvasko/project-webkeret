import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../../../shared/services/shows.service';
import { Show } from '../../../shared/models/Show';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent implements OnInit{

  selectedShow: Show | null = null;
  selectedSeats: number[] = [];

  constructor(private showsService: ShowsService) {}

  ngOnInit() {
    this.showsService.getSelectedShow().subscribe(show => {
      this.selectedShow = show;
    });
  }

  selectedSeatIndexArray: number[] = [];

  selectSeat(index: number) {
    if (this.selectedSeatIndexArray.includes(index)) {
      // If the seat is already selected, unselect it
      this.selectedSeatIndexArray = this.selectedSeatIndexArray.filter(i => i !== index);
      this.selectedSeats = this.selectedSeats.filter(i => i !== index);
    } else {
      // Otherwise, select the seat
      this.selectedSeatIndexArray.push(index);
      this.selectedSeats.push(index);
    }
    console.log(index+1);
  }

  isSelected(index: number) {
    return this.selectedSeatIndexArray.includes(index);
  }
  book(){}
}
