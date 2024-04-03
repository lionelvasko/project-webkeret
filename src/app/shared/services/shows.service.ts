import { Injectable } from '@angular/core';
import { Show } from '../models/Show';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

  private selectedShow = new BehaviorSubject<Show | null>(null);

  setSelectedShow(show: Show) {
    this.selectedShow.next(show);
  }

  getSelectedShow() {
    return this.selectedShow.asObservable();
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
