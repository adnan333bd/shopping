import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  public _token: string;

  get token(): string {
    return this._token;
  }

  constructor(private router: Router) {
  }

  public authChange_$(): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          this.getToken();
        } else {
          this._token = null;
        }
      }
    );
  }

  signupUser(email: string, password: string): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
          this.router.navigate(['/']);
          return response;
        }
      )
      .catch(error => console.log(error));
  }

  private getToken(): Promise<string> {
    const user = firebase.auth().currentUser;
    if (user == null) {
      return Promise.resolve(null);
    }
    return user.getIdToken()
      .then((token: string) => {
        this._token = token;
        return token;
      });
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }
}
