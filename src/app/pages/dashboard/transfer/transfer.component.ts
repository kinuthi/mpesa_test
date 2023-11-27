import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TransferUserComponent } from 'src/app/components/transfer-user/transfer-user.component';
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
  constructor(private modalService: NgbModal,private localStorage: LocalStorageService,private topUpServ : TopUpService) { }

  async ngOnInit() {
    this.loadAllTopUps();
    }
    async loadAllTopUps(){

      this.topUpServ.topUpData.subscribe(value=>{
       this.allTopUpsArray = value;
      })
   
     }
  // async loadAllMyTopUps(){
  //   this.currentUser = await  this.localStorage.getUser();
  //   this.topUpServ.topUpData.subscribe(value=>{
  //     this.allTopUpsArray = value;
  //    })
  //   this.allTopUpsArray =  this.allTopUpsArray.filter((value: { created_by: any; }) => value.created_by  === this.currentUser?.email  )
  
  // }
  async transferFunds(){
    const modalRef = this.modalService.open(TransferUserComponent, {
      centered: true, 
    });
    modalRef.result.then(
      async (result) => {
        await this.loadAllTopUps();
        console.log(`Modal closed with result: ${result}`);
      },
      async (reason) => {
        await this.loadAllTopUps();
        console.log(`Modal dismissed with reason: ${reason}`);
      }
    );
  }

}
