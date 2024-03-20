import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { Ticket } from '../models/Ticket';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  collectionName = 'tickets';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage, private firestore: Firestore) { }

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
}
