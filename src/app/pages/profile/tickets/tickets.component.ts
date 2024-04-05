import { Component } from '@angular/core';
import { Ticket } from '../../../shared/models/Ticket';
import { getAuth } from 'firebase/auth';
import { TicketsService } from '../../../shared/services/tickets.service';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  auth = getAuth();
  userid: string | undefined;
  cards: Observable<any> | undefined;
  constructor(private ticketService: TicketsService, private breakpointObserver: BreakpointObserver) {
    this.userid = this.auth.currentUser?.uid;
  }

  tickets: Ticket[] = [];

  ngOnInit() {
    if(this.userid) {
      this.ticketService.getTickets(this.userid).then((ticket: Ticket[] | null) => {
        this.tickets = ticket || [];
      });
    }
  }
}
