import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../shared/services/storage.service';
import { getAuth } from "firebase/auth";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


  name = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');
  currentuser;
  auth = getAuth();

  constructor(private storageService: StorageService) {
    this.currentuser = this.auth.currentUser;
    if (this.currentuser?.uid) {
      this.storageService.getUserData(this.currentuser.uid).then((data: any) => {
        if (data) {
          this.name.setValue(data.name);
          this.email.setValue(data.email);
          this.phone.setValue(data.phone);
          this.address.setValue(data.address);
        }
      });
    }
  }


  async change(event: Event) {
    event.preventDefault();

  }

}
