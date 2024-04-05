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

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage, private firestore: Firestore, private showservice: ShowsService) { }

  async getTickets(userID: string) {
    const docSnap = await getDoc(doc(this.firestore, 'users', userID));
    if (docSnap.exists()) {
      return docSnap.data()["tickets"] as string[];
    } else {
      console.log('No such document!');
      return null;
    }
  }
  async getTicketInfo(ticketID: string): Promise<Ticket>{
    return (await getDoc(doc(this.firestore, 'tickets', ticketID))).data() as Ticket;
  }

  async addTicket(userID: string, showID: string, seats: number[]){
    const userRef = doc(this.firestore, 'users', userID);
    const ticketData = { showID, seats };
  
    const userSnap = await getDoc(userRef);
    let currentTickets = [];
  
    if (userSnap.exists() && userSnap.data() && userSnap.data()['tickets']) {
      currentTickets = userSnap.data()['tickets'];
    }
  
    currentTickets.push(ticketData);
  
    await updateDoc(userRef, { tickets: currentTickets });
  }
}
