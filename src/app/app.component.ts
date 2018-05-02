import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  authUnsub: firebase.Unsubscribe;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('firebase init');
    firebase.initializeApp({
      apiKey: 'AIzaSyCfmZboy2CSyDFl08hNBvZW5X-ooOtattk',
      authDomain: 'shoppinglist-9c9f6.firebaseapp.com',
      databaseURL: 'https://shoppinglist-9c9f6.firebaseio.com',
      projectId: 'shoppinglist-9c9f6',
      storageBucket: 'shoppinglist-9c9f6.appspot.com',
      messagingSenderId: '606815760166'
    });

    this.authUnsub = this.authService.authChange_$();
  }

  ngOnDestroy() {
    this.authUnsub();
  }
}
