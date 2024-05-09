import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from '../../../../shared/services/storage.service';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss']
})
export class AddMoviesComponent {

  nameText= new FormControl('');
  durationNumber= new FormControl('');
  releaseDateText=new FormControl('');
  filepathText: string = '';

  constructor(private storage: AngularFireStorage,  private myStorage: StorageService, private router: Router) {}

  uploadPicture(event: any) {
    const file = event.target.files[0];
    const filePath = `/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          this.filepathText = downloadURL;
        });
      })
    ).subscribe(
      () => {
        console.log('Upload complete');
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }

  upload(event: Event) {
    event.preventDefault();
    const name = this.nameText?.value;
    const duration = Number(this.durationNumber?.value);
    const filepath = this.filepathText;
  
    if (name === '' || isNaN(duration) || this.releaseDateText?.value === null || filepath === '') {
      alert('Minden mezőt ki kell tölteni!');
      return;
    }
  
    const releaseDateInSeconds = new Date(this.releaseDateText?.value ?? '').getTime() / 1000;
    const releaseDate = new Timestamp(releaseDateInSeconds, 0);
  
    this.myStorage.addMovie(this.nameText?.value ?? '', duration, this.filepathText ?? '', releaseDate);
    alert('Movie added successfully!')
    this.router.navigate(['/']);
  }

}
