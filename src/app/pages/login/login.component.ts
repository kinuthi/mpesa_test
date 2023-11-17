import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form: FormGroup;
  // email: string = '';
  // password: string = '';
  showPassword: boolean = false;


  constructor(private fb: FormBuilder,private authService: AuthService, private router : Router) { 
    this.form = this.fb.group({
      email: new FormControl('', (Validators.required ,Validators.pattern('[^ @]*@[^ @]*'))),
      password: [null, Validators.compose([Validators.required])],
    });
  }

  showInputPassword() {
    this.showPassword = !this.showPassword;
  }


  signIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
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
