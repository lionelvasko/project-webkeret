import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShowsService } from '../../../shared/services/shows.service';
import { Show } from '../../../shared/models/Show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrl: './add-show.component.scss'
})
export class AddShowComponent {
  seatsNumberText = new FormControl('');
  showDate = new FormControl('');
  nameText = new FormControl('');

  constructor(private showStorage: ShowsService, private router: Router) { }

  upload(event: Event) {
    event.preventDefault();
    const seats: boolean[] = new Array(Number(this.seatsNumberText.value)).fill(true);
    const show: Show = {
      seats: seats,
      datetime: this.showDate.value as string,
      movie: this.nameText.value as string
    };

    this.showStorage.addShow(show);
    this.router.navigate(['/shows']);
  }

}
