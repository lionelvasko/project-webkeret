import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-pswd',
  templateUrl: './forgot-pswd.component.html',
  styleUrl: './forgot-pswd.component.scss'
})
export class ForgotPswdComponent {

  email = new FormControl('');

  constructor(private _location: Location, private authService: AuthService) 
  {}

  back() {
    this._location.back();
  }

  send(event: Event) {
    event.preventDefault();
    this.authService.resetPassword(this.email.value || '');
    alert('Check your email for further instructions');
    }

}
