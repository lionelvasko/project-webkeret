import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc} from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: Firestore) { }

  async createUser(email: string, password: string, userID: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      email: email,
      password: password,
    });
  }

  async getUserData(documentId: string) {
    const docSnap = await getDoc(doc(this.firestore, 'users', documentId));
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  }

async updateCurrentUser(userID: string ,name: string, email: string, password: string, phone: string, address: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address
    });
  }
}
