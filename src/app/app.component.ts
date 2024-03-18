import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mozi';
  constructor(private authService: AuthService) {}

  checkUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }
}
