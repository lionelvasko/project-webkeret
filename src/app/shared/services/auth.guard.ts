import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service'; // adjust the path to match the location of your auth.service.ts file

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserLoggedIn().pipe(map(user => {
      if (user) {
        return true;
      } else {
        // Redirect to login page
        alert('You need to be logged in to access this page');
        return this.router.createUrlTree(['/login']);
      }
    }));
  }
}