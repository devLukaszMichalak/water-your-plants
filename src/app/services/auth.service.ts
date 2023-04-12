import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {UserCredential} from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserCredential: UserCredential | null = null;

  constructor() {
  }

  createUser(email: string, password: string) {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(r => {
        this.currentUserCredential = r;
      }).catch(err => {
      console.log(err)
    })
  }

  signInUser(email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(r => {
        this.currentUserCredential = r;
      }).catch(err => {
      console.log(err)
    })
  }

}

