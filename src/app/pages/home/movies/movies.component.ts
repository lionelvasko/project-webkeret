import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MoviesService } from '../../../shared/services/movies.service';
import { Movie } from '../../../shared/models/Movie';
import { Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  
  movies: Movie[] = [];
  cards: Observable<any> | undefined;
  isAdmin: boolean | undefined;
  auths = getAuth();
  currentuser: any;

  constructor(private moviesService: MoviesService, private breakpointObserver: BreakpointObserver, private storage: StorageService, private auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
      if (user) {
        this.currentuser = user;
        this.storage.isAdmin(this.currentuser.uid).then((data: any) => {
          this.isAdmin = data;
          console.log('isAdmin: ', this.isAdmin);
        });
      }
    });
  }

  ngOnInit() {
    this.moviesService.loadMovies().subscribe(movies => {
      this.movies = movies;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          if (matches) {
            return this.movies.map((movie, index) => {
              return {cols: 5, rows: 1, picture: movie.picture, title: movie.name};
            });
          }
          return this.movies.map((movie, index) => {
            return {cols: 1, rows: 1, picture: movie.picture,title: movie.name};
          });
        })
      );
    });
  }
}
