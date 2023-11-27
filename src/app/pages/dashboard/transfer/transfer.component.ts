import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopUpService } from 'src/app/services/topup.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  allTopUpsArray : any;
  currentUser : any;
  constructor(private localStorage: LocalStorageService,private topUpServ : TopUpService) { }

  async ngOnInit() {
    this.loadAllMyTopUps();
    }

  async loadAllMyTopUps(){
    this.currentUser = await  this.localStorage.getUser();
    this.topUpServ.topUpData.subscribe(value=>{
      this.allTopUpsArray = value;
     })
    this.allTopUpsArray =  this.allTopUpsArray.filter((value: { created_by: any; }) => value.created_by  === this.currentUser?.email  )
  
  }

}
