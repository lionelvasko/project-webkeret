import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrl: './add-show.component.scss'
})
export class AddShowComponent {
  seatsNumberText = new FormControl('');
  showDate = new FormControl('');
  nameText = new FormControl('');
  uploadPicture($event: Event) {
  throw new Error('Method not implemented.');
  }

  upload($event: SubmitEvent) {
    return;
  }

}
