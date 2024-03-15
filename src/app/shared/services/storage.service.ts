import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: Firestore) { }

  async createuser(email: string, password: string) {
    const docRef = await addDoc(collection(this.firestore, 'users'), {
      email: email,
      password: password
    });
    console.log("Document written with ID: ", docRef.id);
}
}
