import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  allTopUpsArray : any;
  currentUser : any;
  constructor(private localStorage: LocalStorageService) { }

  async ngOnInit() {
    this.loadAllMyTopUps();
    }

  async loadAllMyTopUps(){
    this.currentUser = await  this.localStorage.getUser();
    const resp = await this.localStorage.getTopUpData();
    this.allTopUpsArray = JSON.parse(resp);

    this.allTopUpsArray =  this.allTopUpsArray.filter((value: { created_by: any; }) => value.created_by  === this.currentUser?.email  )
  
  }

}
