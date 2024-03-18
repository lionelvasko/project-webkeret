import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Movie } from '../models/Movie';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  collectionName = 'movies';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadMovies(): Observable<Array<Movie>> {
    return this.afs.collection<Movie>(this.collectionName).valueChanges();
  }

  loadMovie(id: string): Observable<Movie | undefined> {
    return this.afs.collection<Movie>(this.collectionName).doc(id).valueChanges();
  }
}
