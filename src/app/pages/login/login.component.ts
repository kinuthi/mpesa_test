import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private authService: AuthService, private router : Router) { }

  

  signIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password)
      .then((response: any) => {

        this.router.navigate(['/dashboard']);
        console.log('Logged in successfully:', response);
        // Handle successful login
      })
      .catch((error: any) => {
        console.error('Login error:', error);
        this.router.navigate(['/login']);
        // Handle login error
      });
  } 

}
