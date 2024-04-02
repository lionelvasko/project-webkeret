import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Movie } from '../models/Movie';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  collectionName = 'movies';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadMovies(): Observable<Array<Movie>> {
    return this.afs.collection<Movie>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Movie;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  deleteMovie(documentID: string) {
    this.afs.collection(this.collectionName).doc(documentID).delete();
    
  }

  
}
