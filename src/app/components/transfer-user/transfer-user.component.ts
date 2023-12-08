import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopUpService } from 'src/app/services/topup.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer-user.component.html',
  styleUrls: ['./transfer-user.component.css']
})
export class TransferUserComponent {


  closeResult = '';
  currentBal = 0;
  transferButton = true;

  phoneNumber: string = '';
  amount: number | null = null;
 

  constructor(private modalService: NgbModal,private topUpService: TopUpService,private localStorageServ : LocalStorageService) {
    
  }
  async ngOnInit(){
    let currentUser = await  this.localStorageServ.getUser();
    this.currentBal = currentUser['currentBal'];
   
  
    if(this.currentBal > 1 ){
      this.transferButton = false;
    }
    console.log('okay', this.transferButton);

  }

  closeModal() {
    this.modalService.dismissAll()
  }

  topUp(form: NgForm){
    this.phoneNumber = form.value.phoneNumber;
    this.amount = form.value.amount;
    if (this.phoneNumber && this.amount !== null) {
      this.topUpService.transferFunds(this.phoneNumber, this.amount);
      this.phoneNumber = '';
      this.amount = null;
    }
    this.closeModal();
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
