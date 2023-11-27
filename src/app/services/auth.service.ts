// auth.service.ts

import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from './local-storage.service';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private localStorageServ : LocalStorageService) {
   
   }

 // Sign up
 async  signUpUser(email: string, password: string) {
  const auth = getAuth();

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Access the user object
    const user = userCredential.user;

    // You can do something with the user object, like updating the UI or redirecting
    console.log('User signed up:', user);

    return user;
  } catch (error) {
    // Handle errors during sign-up
    console.error('Sign-up error:', error);
    throw error; // Rethrow the error if needed for further handling
  }
}
  
  // Sign in
  async  signIn(email: string, password: string) {
    
    const auth = getAuth();
     
  
    try {
      // Sign in the user with email and password
      console.log('nice mike', auth, email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Access the user object
      const user = userCredential.user;
      
      // You can do something with the user object, like updating the UI or redirecting
      console.log('User logged in:', user);
      
      return user;
    } catch (error) {
      // Handle errors during login
      console.error('Login error:', error);
      throw error; // Rethrow the error if needed for further handling
    }
  }
  
  // signIn(email: string, password: string) {
  //   let response =  this.afAuth.signInWithEmailAndPassword(email, password);
  //   this.getCurrentUser();
  //   return response;
  // }
  
  // // Sign out
  async  signOut() {
    const auth = getAuth();
  
    try {
      // Sign out the current user
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      // Handle errors during sign-out
      console.error('Sign-out error:', error);
      throw error; // Rethrow the error if needed for further handling
    }
  }
   getCurrentUser() {
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      // Listen for changes in authentication state
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe to avoid further updates
        
        if (user) {
          // User is signed in
          resolve(user);
        } else {
          // No user is signed in
          resolve(null);
        }
      }, (error) => {
        // Handle errors during onAuthStateChanged
        console.error('Authentication state change error:', error.message);
        reject(error);
      });
    });
  }
  //async getCurrentUser() {
    // this.afAuth.authState.subscribe((user) => {
    //     if (user) {
    //       // User is signed in
    //       const currentUserDetails = {
    //         email : user['email']
    //       }; 
    //       this.localStorageServ.saveUser(currentUserDetails);
    //       return currentUserDetails;
    //     } else {
    //       // User is signed out
    //       console.log('No user is currently signed in.');
    //       return {};
    //     }
    //   });
   // }
}
