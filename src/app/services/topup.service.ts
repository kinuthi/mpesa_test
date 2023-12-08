import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopUpService {


    currentUser : any;

    private _topUpData = new BehaviorSubject<any[]>([]);
    private _transferData = new BehaviorSubject<any[]>([]);
    private dataStore: { topUpData: any[],transferData: any[] } = { topUpData: [], transferData: [] };
    readonly topUpData = this._topUpData.asObservable();
    readonly transferData = this._transferData.asObservable();
    constructor(private localStorageServ : LocalStorageService) {
   
    }
    
  private topUpHistory: any[] = [];
  private transferHistory: any[] = [];

  getTopUpHistory(): any[] {
    return this.topUpHistory;
  }
  async transferFunds(phoneNumber: string, amount: number) {

    
    this.currentUser = await  this.localStorageServ.getUser();
    console.log('nice mike', this.currentUser );

    const resp = await this.localStorageServ.getTopUpData(); 

    if(resp && resp.length){
      this.transferHistory = JSON.parse(resp);  
    }
     
    const transfer = { phoneNumber, amount, timestamp: new Date() ,created_by :  this.currentUser?.email   };
   
    this.transferHistory.push(transfer);

    this.dataStore.transferData.unshift(transfer);
    this._transferData.next(Object.assign({}, this.dataStore).transferData);

    //update user balance 

    let currentTransferBal =  0;
    this.transferHistory.map(value=>{
      currentTransferBal+= parseInt(value.amount)
    })
  
    this.currentUser["totalTransfer"] = currentTransferBal; 
    this.currentUser["currentBal"] -= amount;
    this.currentUser["currentTransferCount"] = this.transferHistory.length;
   this.localStorageServ.saveUser( this.currentUser)

  }

  async addTopUp(amount: number) {

    
    this.currentUser = await  this.localStorageServ.getUser();
  

    const resp = await this.localStorageServ.getTopUpData(); 

    if(resp && resp.length){
      this.topUpHistory = JSON.parse(resp);  
    }
     
    const topUp = {amount,timestamp: new Date() ,created_by :  this.currentUser?.email   };
   
    this.topUpHistory.push(topUp);

    this.dataStore.topUpData.unshift(topUp);
    this._topUpData.next(Object.assign({}, this.dataStore).topUpData);

    //update user balance 
  
    let currentUserBal =  0;
    this.topUpHistory.map(value=>{
      currentUserBal+= parseInt(value.amount)
    })
    
    this.currentUser["currentBal"] = currentUserBal-this.currentUser["totalTransfer"]; 
    this.currentUser["currentTopUpCount"] = this.transferHistory.length;
   this.localStorageServ.saveUser( this.currentUser);
   

  }
}