import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopUpService } from 'src/app/services/topup.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer-user.component.html',
  styleUrls: ['./transfer-user.component.css']
})
export class TransferUserComponent {


  closeResult = '';

  phoneNumber: string = '';
  amount: number | null = null;
 

  constructor(private modalService: NgbModal,private topUpService: TopUpService) {}

  closeModal() {
    this.modalService.dismissAll()
  }

  topUp(form: NgForm){
    this.phoneNumber = form.value.phoneNumber;
    this.amount = form.value.amount;
    if (this.phoneNumber && this.amount !== null) {
      this.topUpService.addTopUp(this.phoneNumber, this.amount);
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
