import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  

  static appLog(value:any[]) {
    if (isDevMode()) {
      console.log(...value);
    }
  }

  static isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static isEmptyKey(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key]) {
        return true;
      }
    }
    return false;
  }

  static getDate(date: Date) {
    const day = date ? date : new Date();
    return day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
  }
}