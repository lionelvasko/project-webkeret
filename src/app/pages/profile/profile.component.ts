import { Component, OnDestroy, OnInit } from '@angular/core';

import { StorageService } from '../../shared/services/storage.service';
import { getAuth } from "firebase/auth";
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{


  name = new BehaviorSubject<string>('');
  email = new BehaviorSubject<string>('');
  phone = new BehaviorSubject<string>('');
  address = new BehaviorSubject<string>('');

  currentuser;
  auth = getAuth();

  constructor(private storageService: StorageService) {
    this.currentuser = this.auth.currentUser;
  }
  ngOnInit(): void {
    this.currentuser = this.auth.currentUser;
    if (this.currentuser?.uid) {
    this.storageService.getUserData(this.currentuser.uid).then((data: any) => {
      if (data) {
        this.name.next(data.name);
        this.email.next(data.email);
        this.phone.next(data.phone);
        this.address.next(data.address);
      }
    });
  }
  }
  ngOnDestroy(): void {
    this.name.complete();
    this.email.complete();
    this.phone.complete();
    this.address.complete();
  }


  async change(event: Event) {
    event.preventDefault();
    if (this.currentuser?.uid) {
      this.storageService.updateCurrentUser(
        this.currentuser.uid,
        this.name.value,
        this.email.value,
        this.phone.value,
        this.address.value
      );
    }
  }

}
