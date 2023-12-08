import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopUpService } from 'src/app/services/topup.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {

  currentBal : any;
  currentTransferBal : any;
  todayTrans = 0;
  totalTrans = 0;
  currentTopUpCount =0;
  currentTransferBalCount=0;
  allTopUpsArray  : any;
  allTransfers : any;
  todayTransArr : any;
  constructor(private localStorageServ : LocalStorageService,private topUpServ : TopUpService) {
    this.topUpServ.topUpData.subscribe(value=>{
      this.allTopUpsArray = value;
     })
     this.topUpServ.transferData.subscribe(value=>{
      this.allTransfers = value;
     })
  
    this.loadAllTopUps();
    this.loadMyBal();
    this.loadTodayTopUps();
   }

  async loadMyBal(){
    let currentUser = await  this.localStorageServ.getUser();
 
    this.currentBal = currentUser['currentBal'];
    this.currentTopUpCount = currentUser['currentTopUpCount'];
    this.currentTransferBal = currentUser['totalTransfer'];
    this.currentTransferBalCount = currentUser['currentTransferCount'];

   
  }


  async loadAllTopUps(){

    this.allTopUpsArray.map( (value: { amount: any; })=>{
      this.totalTrans+=parseInt(value.amount)
    })
  }
  async loadTodayTopUps(){
   
    const targetDate = new Date();
    const targetDateString = targetDate.toDateString();

// Filter the array for transactions that occurred today
this.todayTransArr = this.allTopUpsArray.filter((transaction: { timestamp: string | number | Date; }) => {
  const transactionDate = new Date(transaction.timestamp).toDateString();
  return transactionDate === targetDateString;
});
this.todayTransArr.map( (value: { amount: any; })=>{
  this.todayTrans+=parseInt(value.amount)
})

  }


  

}
