import { Injectable } from '@angular/core';
import { Show } from '../models/Show';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  collectionName = 'shows';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadShows(): Observable<Array<Show>> {
    return this.afs.collection<Show>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Show;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  private selectedShowID = new BehaviorSubject<string | null>(null);

  setSelectedShow(showID: string) {
    this.selectedShowID.next(showID);
  }

  getShow(showId: string): Observable<Show | null> {
    return this.afs.collection(this.collectionName).doc<Show>(showId).snapshotChanges().pipe(
      map(snapshot => {
        const data = snapshot.payload.data() as Show;
        if (data) {
          return { id: snapshot.payload.id, ...data };
        } else {
          return null;
        }
      })
    );
  }

  getSelectedShow(): Observable<Show | null> {
    return this.selectedShowID.pipe(
      switchMap(showId => {
        if (showId) {
          return this.getShow(showId);
        } else {
          return of(null);
        }
      })
    );
  }

  removeSelectedShows(showID: string){
    this.afs.collection(this.collectionName).doc(showID).delete();
  }

  updateShow(showID: string, selectedSeats: number[]){
    const docRef = this.afs.collection(this.collectionName).doc(showID);
    console.log(showID)
  
    docRef.get().toPromise().then((doc) => {
      if (doc && doc.exists) {
        const showData = doc.data() as Show;
        const updatedSeats = showData.seats.map((seat, index) => {
          return selectedSeats.includes(index) ? true : seat;
        });
  
        docRef.update({seats: updatedSeats});
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
}
