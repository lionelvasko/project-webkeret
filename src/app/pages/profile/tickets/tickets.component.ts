import { Component } from '@angular/core';
import { Ticket } from '../../../shared/models/Ticket';
import { getAuth } from 'firebase/auth';
import { TicketsService } from '../../../shared/services/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  auth = getAuth();
  tickets: Ticket[] = [];
  userid: string | undefined;
  constructor(private ticketService: TicketsService) {
    this.userid = this.auth.currentUser?.uid; // Add null check
  }

  ngOnInit() {
    if(this.userid) {
      this.ticketService.getTickets(this.userid).subscribe((tickets) => {
        this.tickets = tickets;
        console.log(this.tickets);
      });
    }
  }

}
