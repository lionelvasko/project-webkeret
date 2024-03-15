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
    const docRef = doc(collection(this.firestore, 'users'), documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

async updateCurrentUser(name: string, email: string, password: string, phone: string, address: string) {
  const existingData = await this.getUserData(email) as unknown as { name: string, email: string, password: string, phone: string, address: string };
  const docRef = await addDoc(collection(this.firestore, 'users'), {
    name: name ? name : (existingData ? existingData.name : ''),
    email: email ? email : (existingData ? existingData.email : ''),
    password: password ? password : (existingData ? existingData.password : ''),
    phone: phone ? phone : (existingData ? existingData.phone : ''),
    address: address ? address : (existingData ? existingData.address : '')
  });
  console.log("Document written with ID: ", docRef.id);
}
}
