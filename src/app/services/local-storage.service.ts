import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_KEY = 'current_user';
  private readonly TOP_UP_DATA = 'top_up_data';

  saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  async saveTopUpData(data: any) {
    await localStorage.setItem(this.TOP_UP_DATA, JSON.stringify(data));
  }

  getTopUpData(): any {
    const data = localStorage.getItem(this.TOP_UP_DATA);
     return data;
  }

  getUser(): any {
    const userString = localStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}