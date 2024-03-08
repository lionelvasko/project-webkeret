import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-pswd',
  templateUrl: './forgot-pswd.component.html',
  styleUrl: './forgot-pswd.component.scss'
})
export class ForgotPswdComponent {
  constructor(private _location: Location) 
  {}

  back() {
    this._location.back();
  }

}
