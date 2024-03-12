import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl} from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy{

  email = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');

  loadingSubscription ?: Subscription;
  loadingObservation?: Observable<boolean>;

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private _location: Location){}

  back() {
    this._location.back();
  }

  async register(event: Event){
    event.preventDefault();

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    const confirmPasswordValue = this.password.value || '';

    if (passwordValue !== confirmPasswordValue) {
      console.error('Passwords do not match');
      return;
    }
      this.authService.register(emailValue, passwordValue).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/home');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });

  }
}
