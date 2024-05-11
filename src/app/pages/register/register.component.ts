import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl} from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy{

  email = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  name = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');

  loadingSubscription ?: Subscription;
  loadingObservation?: Observable<boolean>;

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  loading: boolean = false;


  constructor(private authService: AuthService, private router: Router, private _location: Location, private storage: StorageService){}

  back() {
    this._location.back();
  }

  async register(event: Event){
    event.preventDefault();

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    const confirmPasswordValue = this.confirmPassword.value || '';
    const nameValue = this.name.value || '';
    const phoneValue = this.phone.value || '';
    const addressValue = this.address.value || '';

    if (!emailValue || !passwordValue || !confirmPasswordValue || !nameValue || !phoneValue || !addressValue) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      alert('A két jelszó nem egyezik meg!');
      return;
    }
      this.authService.register(emailValue, passwordValue).then(cred => {
        let auth = getAuth();
        let user = auth.currentUser;    
        this.storage.createUser(emailValue, passwordValue, nameValue, phoneValue, addressValue, user?.uid ?? '').then(cred2 =>{
          console.log(cred2);
        });
        this.router.navigateByUrl('/home');
        this.loading = false;
      }).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address already in use.`)
            break;
          case 'auth/invalid-email':
            console.log(`Email address ${emailValue} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert('Error during sign up.');
            break;
          case 'auth/weak-password':
            alert ('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            alert('An error occurred.' + error.message);
            break;
        }
      });

  }
}
