import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

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
  }
}
