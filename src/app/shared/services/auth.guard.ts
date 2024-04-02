import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from './storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentuser: any;
  isAdmin: any;

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar, private storage: StorageService, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.currentuser = user;
        this.storage.isAdmin(this.currentuser.uid).then((data: any) => {
          this.isAdmin = data;
        });
      }
    });
   }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.auth.authState.subscribe(user => {
        if (user) {
          this.currentuser = user;
          this.storage.isAdmin(this.currentuser.uid).then((data: any) => {
            this.isAdmin = data;
            const url: string = state.url;
            resolve(url === '/home/add-movies' ? this.canActivateAdmin() : this.isUserLoggedIn());
          });
        } else {
          resolve(this.isUserLoggedIn());
        }
      });
    });
  }

  isUserLoggedIn(): boolean {
    if (this.currentuser) {
      return true;
    } else {
      // Redirect to login page
      this.snackBar.open('You need to be logged in to access this page', 'Close', {
        duration: 5000,
      });
      this.router.navigate(['/login']);
      return false;
    }
  }

  async canActivateAdmin(): Promise<boolean> {
    if (!this.isAdmin) {
      this.isAdmin = await this.storage.isAdmin(this.currentuser.uid);
    }
  
    if (this.isAdmin) {
      return true;
    } else {
      this.snackBar.open('You need to be an admin to access this page', 'Close', {
        duration: 5000,
      });
      this.router.navigate(['/home']);
      console.log(this.isAdmin)
      return false;
    }
  }
}