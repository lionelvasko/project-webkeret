import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription ?: Subscription;
  loadingObservation?: Observable<boolean>;

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router){}


  async login(event: Event){
    event.preventDefault();

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.authService.login(emailValue, passwordValue).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home');
      this.loading = false;
    }).catch(error => {
      alert('A felhasználónév vagy jelszó nem megfelelő!');
      this.loading = false;
    });

  }


}
