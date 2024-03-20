import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  getTickets(userID: string): Observable<Array<Ticket>> {
    return this.afs.collection('users').doc(userID).valueChanges().pipe(
      map((user: any) => user.tickets)
    );
  }
}
