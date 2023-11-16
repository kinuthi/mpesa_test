import { Component } from '@angular/core';
import { TopUpFormComponent } from 'src/app/components/top-up-form/top-up-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent {
 allTopUpsArray : any;
  constructor(private modalService: NgbModal,private localStorage: LocalStorageService) { }
 

  async ngOnInit() {
   
  this.loadAllTopUps();
  }

  async loadAllTopUps(){
    const resp = await this.localStorage.getTopUpData();

    this.allTopUpsArray = JSON.parse(resp);

    console.log('nice mike', this.allTopUpsArray );
  }

  async topUpUser(){
    const modalRef = this.modalService.open(TopUpFormComponent, {
      centered: true, // You can customize modal options here
      // ... other options
    });
    modalRef.result.then(
      async (result) => {
          console.log('nice again');
        await this.loadAllTopUps();
        console.log(`Modal closed with result: ${result}`);
      },
      async (reason) => {
        console.log('nice again 2');
        await this.loadAllTopUps();
        console.log(`Modal dismissed with reason: ${reason}`);
      }
    );
  }
}
