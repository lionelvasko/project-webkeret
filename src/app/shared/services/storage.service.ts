import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';

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

  async getUserData(email: string) {
    const q = query(collection(this.firestore, 'users'), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let userData = null;
    querySnapshot.forEach((doc) => {
        userData = { id: doc.id, ...doc.data() };
    });
    return userData;
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
