import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser : any;
  constructor(private localStorageServ : LocalStorageService) {
    this.getCurrentUser();
   }


   async getCurrentUser(){
    this.currentUser = await  this.localStorageServ.getUser();
  }
}
