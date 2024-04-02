import { Injectable } from '@angular/core';
import { Show } from '../models/Show';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  collectionName = 'shows';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadShows(): Observable<Array<Show>> {
    return this.afs.collection<Show>(this.collectionName).valueChanges();
  }
}
