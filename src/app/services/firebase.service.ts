// Import the functions you need from the SDKs you need
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {
    // Firebase yapılandırması
    const firebaseConfig = {
      apiKey: 'AIzaSyDgMMKZb8ytXFFpE63srFF3gpAH0Zw3l4s',
      authDomain: 'login-register-app-8f965.firebaseapp.com',
      databaseURL:
        'https://login-register-app-8f965-default-rtdb.firebaseio.com',
      projectId: 'login-register-app-8f965',
      storageBucket: 'login-register-app-8f965.appspot.com',
      messagingSenderId: '984205031639',
      appId: '1:984205031639:web:c42d6f9f4c0e121365d892',
    };

    // Firebase başlatma
    //   firebase.initializeApp(firebaseConfig);
    const app = initializeApp(firebaseConfig);
  }
}
