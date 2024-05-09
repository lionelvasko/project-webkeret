import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Show } from '../../../shared/models/Show';
import { Observable } from 'rxjs';
import { ShowsService } from '../../../shared/services/shows.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-shows-dashboard',
  templateUrl: './shows-dashboard.component.html',
  styleUrl: './shows-dashboard.component.scss'
})
export class ShowsDashboardComponent {
deleteCard(card: any) {
    this.showService.removeSelectedShows(card.id);
}
  shows: Show[] = [];
  cards: Observable<any> | undefined;
  selectedShow: Show | undefined;
  currentuser: any;
  isAdmin: boolean = false;

  constructor(private showService: ShowsService, private breakpointObserver: BreakpointObserver, private auth: AngularFireAuth, private storage: StorageService) { 
    this.auth.authState.subscribe(user => {
      if (user) {
        this.currentuser = user;
        this.storage.isAdmin(this.currentuser.uid).then((data: any) => {
          this.isAdmin = data;
        });
      }
    });
  }

  ngOnInit() {
    this.showService.loadShows().subscribe(shows => {
      this.shows = shows;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          return this.shows.map((show, index) => {
            return {cols: 1, rows: 2, time: show.datetime, title: show.movie, seats: show.seats, id: show.id};
          });
        })
      );
    });
  }
  
  selectShow(showID: string) {
    this.showService.setSelectedShow(showID);
    console.log(showID);
  }
}
