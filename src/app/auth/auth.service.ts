import * as firebase from 'firebase';

export class AuthService {

  private token: string;

  signupUser(email: string, password: string): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
          this.getToken();
          console.log(response);
          return response;
        }
      )
      .catch(error => console.log(error));
  }

  getToken(): Promise<string> {
    const user = firebase.auth().currentUser;
    if (user == null) {
      return Promise.resolve(null);
    }
    return user.getIdToken()
      .then((token: string) => {
        this.token = token;
        return token;
      });
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
