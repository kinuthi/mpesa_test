import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updatePhoneNumber } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private localStorageServ : LocalStorageService) {
   
   }

 
  

 async  signUpUser(email: string, password: string,phoneNumber:string) {
  const auth = getAuth();

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    

    return user;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error; 
  }
}


  async  signIn(email: string, password: string) {
    
    const auth = getAuth();
     
  
    try {
      console.log('nice mike', auth, email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log('User logged in:', user);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  }

  async  signOut() {
    const auth = getAuth();
  
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error; 
    }
  }
   getCurrentUser() {
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); 
        
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, (error) => {
        console.error('Authentication state change error:', error.message);
        reject(error);
      });
    });
  }

}
