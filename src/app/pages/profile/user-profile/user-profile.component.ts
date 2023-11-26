import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  currentUser : any;
  constructor(private localStorageServ : LocalStorageService) {
    this.getCurrentUser();
   }


   async getCurrentUser(){
    this.currentUser = await  this.localStorageServ.getUser();
  }
}
