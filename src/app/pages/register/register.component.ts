import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  full_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router : Router) { }

  signUp(form: NgForm) {
    const full_name = form.value.email;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUp(email, password)
      .then((response: any) => {
        this.router.navigate(['/login']);
        console.log('signed up in successfully:', response);
        // Handle successful login
      })
      .catch((error: any) => {
        this.router.navigate(['/register']);
        console.error('Login error:', error);
        // Handle login error
      });
  } 
}
