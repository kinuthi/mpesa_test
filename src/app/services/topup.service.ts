import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopUpService {


    currentUser : any;

    private _topUpData = new BehaviorSubject<any[]>([]);
    private dataStore: { topUpData: any[] } = { topUpData: [] };
    readonly topUpData = this._topUpData.asObservable();

    constructor(private localStorageServ : LocalStorageService) {
   
    }
    
  private topUpHistory: any[] = [];

  getTopUpHistory(): any[] {
    return this.topUpHistory;
  }

  async addTopUp(phoneNumber: string, amount: number) {

    
    this.currentUser = await  this.localStorageServ.getUser();

    const resp = await this.localStorageServ.getTopUpData(); 

    if(resp && resp.length){
      this.topUpHistory = JSON.parse(resp);  
    }
     
    const topUp = { phoneNumber, amount, timestamp: new Date() ,created_by :  this.currentUser?.email   };
   
    //this.topUpHistory.push(topUp);

    this.dataStore.topUpData.unshift(topUp);
    this._topUpData.next(Object.assign({}, this.dataStore).topUpData);

    //update user balance 

    let currentUserBal =  0;
    this.topUpHistory.map(value=>{
      currentUserBal+= parseInt(value.amount)
    })
    this.currentUser["currentBal"] = currentUserBal; 
   this.localStorageServ.saveUser( this.currentUser)
    
   // await this.localStorageServ.saveTopUpData(this.topUpHistory);
  }
}