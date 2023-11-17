import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form: FormGroup; 
 
  showPassword: boolean = false;

  constructor(private fb: FormBuilder , private authService: AuthService, private router : Router) {
    this.form = this.fb.group({
      email: new FormControl('', Validators.pattern('[^ @]*@[^ @]*')),
      full_name: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
   }


  showInputPassword() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    const full_name = this.form.value.email;
    const email = this.form.value.email;
    const password = this.form.value.password;

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
