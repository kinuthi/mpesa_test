import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser : any;
  constructor(private localStorageServ : LocalStorageService,private authService: AuthService,private router : Router) {
    this.getCurrentUser();
   }


   async getCurrentUser(){
    this.currentUser = await  this.localStorageServ.getUser();
  }

  signOut() {
    this.authService.signOut()
    .then((response: any) => {

      this.router.navigate(['/login']);
      console.log('Logged out  successfully:', response);
      // Handle successful logout
    })
    .catch((error: any) => {
      console.error('Logout failed error:', error);
      this.router.navigate(['/dashboard']);
      // Handle logout error
    });
  }
}
