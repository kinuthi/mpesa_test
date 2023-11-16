import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TopUpService {
    currentUser : any;
    constructor(private localStorageServ : LocalStorageService) {
   
    }
    
  private topUpHistory: any[] = [];

  getTopUpHistory(): any[] {
    return this.topUpHistory;
  }

  async addTopUp(phoneNumber: string, amount: number) {
    this.currentUser = await  this.localStorageServ.getUser();

    const resp = await this.localStorageServ.getTopUpData(); 

    if(resp.length){
      this.topUpHistory = JSON.parse(resp);  
    }

    const topUp = { phoneNumber, amount, timestamp: new Date() ,created_by :  this.currentUser?.email   };
    this.topUpHistory.push(topUp);
    
    await this.localStorageServ.saveTopUpData(this.topUpHistory);
  }
}