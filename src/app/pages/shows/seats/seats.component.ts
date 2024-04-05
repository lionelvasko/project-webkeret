import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../../../shared/services/shows.service';
import { Show } from '../../../shared/models/Show';
import { Router } from '@angular/router';
import { TicketsService } from '../../../shared/services/tickets.service';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent implements OnInit{

  selectedShow: Show | null = null;
  selectedSeats: number[] = [];
  auth = getAuth();
  currentUser: any;

  constructor(private showsService: ShowsService, private router: Router, private ticketservice: TicketsService,) {
    this.currentUser = this.auth.currentUser;
  }

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
  book(){
    if (this.selectedShow) {
      this.showsService.updateShow(this.selectedShow.id, this.selectedSeats);
      this.ticketservice.addTicket(this.currentUser.uid, this.selectedShow.id, this.selectedSeats);
      alert('Seats booked successfully');
      this.router.navigate(['/']);
    } else {
      console.error('selectedShow is null');
    }
  }
}
