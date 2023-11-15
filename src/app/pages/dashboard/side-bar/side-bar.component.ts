import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private authService: AuthService, private router : Router) { }

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
