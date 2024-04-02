import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, deleteDoc} from '@angular/fire/firestore';
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: Firestore) { }

  async createUser(email: string, password: string, name: string, phone: string, address: string , userID: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      email: email,
      password: password,
      name: name,
      phone: phone,
      address: address,
      admin: false
    });
  }

  async deleteUser(userID: string) {
    console.log('Deleting user with ID: ', userID);
    await deleteDoc(doc(this.firestore, 'users', userID));
  }

  async getUserData(documentId: string) {
    const docSnap = await getDoc(doc(this.firestore, 'users', documentId));
    if (docSnap.exists()) {
      return docSnap.data() as string[];
    } else {
      console.log('No such document!');
      return null;
    }
  }

  async updateCurrentUser(userID: string ,name: string, email: string, phone: string, address: string) {
    const docRef = doc(this.firestore, 'users', userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const updatedData = {
      name: name !== '' ? name : userData['name'],
      email: email !== '' ? email : userData['email'],
      phone: phone !== '' ? phone : userData['phone'],
      address: address !== '' ? address : userData['address']
      };
      await setDoc(docRef, updatedData);
    }
  }

  async isAdmin(userID: string) {
    const docSnap = await getDoc(doc(this.firestore, 'users', userID));
    if (docSnap.exists()) {
      return docSnap.data()['admin'];
    } else {
      console.log('No such document!');
      return null;
    }
  }

  async addMovie(name: string, duration: string, picture: string, releaseDate: String){
    await addDoc(collection(this.firestore, 'movies'), {
      name: name,
      duration: duration,
      picture: picture,
      releaseDate: releaseDate
    });
  }

}
