import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { deleteUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }
  currentUser() {
    return this.auth.currentUser;
  }
  deleteUser() {
    this.auth.currentUser.then(user => {
      user?.delete();
    });
  }
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
