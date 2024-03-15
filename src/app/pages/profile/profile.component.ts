import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');



  change() {
  throw new Error('Method not implemented.');
  }

}
