import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Show } from '../../../shared/models/Show';
import { Observable } from 'rxjs';
import { ShowsService } from '../../../shared/services/shows.service';

@Component({
  selector: 'app-shows-dashboard',
  templateUrl: './shows-dashboard.component.html',
  styleUrl: './shows-dashboard.component.scss'
})
export class ShowsDashboardComponent {
  shows: Show[] = [];
  cards: Observable<any> | undefined;

  constructor(private showService: ShowsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.showService.loadShows().subscribe(shows => {
      this.shows = shows;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          if (matches) {
            return this.shows.map((show, index) => {
              return {cols: 2, rows: 1, time: show.datetime, title: show.movie, seats: show.seats};
            });
          }
          return this.shows.map((show, index) => {
            return {cols: 1, rows: 1, time: show.datetime, title: show.movie, seats: show.seats};
          });
        })
      );
    });
  }
}
