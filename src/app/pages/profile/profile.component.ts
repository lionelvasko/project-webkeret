import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { getAuth } from "firebase/auth";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl } from '@angular/forms';


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


  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {
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

  delete() {
    if (this.currentuser?.uid) {
      this.storageService.deleteUser(this.currentuser.uid).then(() => {
        this.authService.deleteUser();
      });
    }
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.name.complete();
    this.email.complete();
    this.phone.complete();
    this.address.complete();
  }

  fname = new FormControl('')
  femail = new FormControl('')
  fphone = new FormControl('')
  faddress = new FormControl('')


  async change(event: Event) {
    event.preventDefault();
    if (this.currentuser?.uid) {
      this.storageService.updateCurrentUser(
        this.currentuser.uid,
        this.fname.value ?? '',
        this.femail.value ?? '',
        this.fphone.value ?? '',
        this.faddress.value ?? ''
      );
    }
  }

}
