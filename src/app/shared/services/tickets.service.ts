import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { Ticket } from '../models/Ticket';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ShowsService } from './shows.service';
import { Show } from '../models/Show';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  collectionName = 'tickets';

  constructor(private firestore: Firestore, private showservice: ShowsService) { }

  async getTickets(userID: string): Promise<Ticket[] | null> {
    const userRef = doc(this.firestore, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data() && userSnap.data()['tickets']) {
      return userSnap.data()['tickets'].map((ticket: any) => ({
        movie: ticket.movie,
        seats: ticket.seats,
        date: ticket.date
      }));
    }
    return null;
}

  async addTicket(userID: string, showID: string, seats: number[]){
    const userRef = doc(this.firestore, 'users', userID);
  
    this.showservice.getShow(showID).subscribe(async (show_movie) => {
      if (show_movie) {
        const movie = show_movie.movie;
        const date = show_movie.datetime;
        const ticketData = { movie, seats, date };
  
        const userSnap = await getDoc(userRef);
        let currentTickets = [];
  
        if (userSnap.exists() && userSnap.data() && userSnap.data()['tickets']) {
          currentTickets = userSnap.data()['tickets'];
        }
  
        currentTickets.push(ticketData);
  
        await updateDoc(userRef, { tickets: currentTickets });
      }
    });
  }


}
