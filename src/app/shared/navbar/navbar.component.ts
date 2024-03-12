import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authService: AuthService) {
    this.authService.isUserLoggedIn().subscribe(user => {
      if (user) {
        this.isSignedIn = true;
        this.isSignedOut = false;
      } else {
        this.isSignedIn = false;
        this.isSignedOut = true;
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    isSignedIn: boolean = false;
    isSignedOut: boolean = true;
    
}
