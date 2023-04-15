import {Injectable} from '@angular/core';
import {UserCredential} from "@firebase/auth";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserCredential: UserCredential | null = null;

  constructor(private auth: Auth,
              private router: Router) {
  }

  logInUser(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(r => {
        console.log(r)
        this.currentUserCredential = r;
        this.router.navigate(['/dashboard'])
      }).catch(err => {
      console.log(err)
    })
  }

  createUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(r => {
        console.log(r)
        this.currentUserCredential = r;
        this.router.navigate(['/dashboard'])
      }).catch(err => {
      console.log(err)
    })
  }

}

