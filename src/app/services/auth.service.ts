// auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private localStorageServ : LocalStorageService) {
   
   }

 // Sign up
signUp(email: string, password: string ) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  
  // Sign in
  signIn(email: string, password: string) {
    let response =  this.afAuth.signInWithEmailAndPassword(email, password);
    this.getCurrentUser();
    return response;
  }
  
  // Sign out
  signOut() {
    return this.afAuth.signOut();
  }
  async getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
        if (user) {
          // User is signed in
          const currentUserDetails = {
            email : user['email']
          }; 
          this.localStorageServ.saveUser(currentUserDetails);
          return currentUserDetails;
        } else {
          // User is signed out
          console.log('No user is currently signed in.');
          return {};
        }
      });
    }
}
