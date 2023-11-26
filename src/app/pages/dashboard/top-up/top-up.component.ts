import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopUpFormComponent } from 'src/app/components/top-up-form/top-up-form.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopUpService } from 'src/app/services/topup.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent {
 allTopUpsArray : any;
  constructor(private modalService: NgbModal,private localStorage: LocalStorageService,private topUpServ : TopUpService) { }
 

  async ngOnInit() {
  this.loadAllTopUps();
  }

  async loadAllTopUps(){

   this.topUpServ.topUpData.subscribe(value=>{
    this.allTopUpsArray = value;
   })

  }

  async topUpUser(){
    const modalRef = this.modalService.open(TopUpFormComponent, {
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
