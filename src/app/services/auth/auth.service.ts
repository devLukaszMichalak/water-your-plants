import {inject, Injectable} from '@angular/core';
import {User, UserCredential} from "@firebase/auth";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserCredential: UserCredential | null = null;

  private auth = inject(Auth)

  getCurrentUser(): User {
    if (this.currentUserCredential) {
      return this.currentUserCredential.user;
    } else {
      throw new Error("No user when one was expected!")
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserCredential !== null;
  }

  logInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(r => {
        this.currentUserCredential = r;
        return this.isAuthenticated();
      }).catch(() => {
        return this.isAuthenticated();
      })
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(r => {
        this.currentUserCredential = r;
        return this.isAuthenticated();
      }).catch(() => {
        return this.isAuthenticated();
      })
  }

}

