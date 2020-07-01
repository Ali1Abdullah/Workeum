import { AppService } from './app.service';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Main } from '../models/main.model';

export interface MainServiceType{
  getDataFromApi(params:any,action:string, type:any):any;
  addToApi(params:any,action:string, type:any):any;
  updateItemInApi(params:any,action:string, type:any):any;
  deleteItemInApi(params:any,action:any);
}
@Injectable({
  providedIn: 'root'
})
export class MainService implements MainServiceType {
  constructor(public http:HttpService) { }

  getDataFromApi(params:any,action:string, type: any) {
      AppService.appLog(['getDataFromApi params:',params]);
       return this.http.getDataFromServer(action,params).pipe(map((response:any)=>{
         AppService.appLog(['getDataFromApi',response]);
         return Main.renderModels(type, response)
       }));
  }


  getOneFromApi(params:any,action:string, type: any) {
    AppService.appLog(['getDataFromApi params:',params]);
     return this.http.getDataFromServer(action,params).pipe(map((response:any)=>{
       AppService.appLog(['getDataFromApi',response]);
       return Main.renderModel(type, response)
     }));
}

  

  addToApi(formData:any,action:string) {
    return this.http.postDataToServer(action,formData).pipe(map((response:any)=>{
      AppService.appLog(['addToApi',response]);
      return  (response)
    }));
  }

  updateItemInApi(formData:any,action:string) {
    return this.http.putDataToServer(action,formData).pipe(map((response:any)=>{
      AppService.appLog(['updateItemInApi',response]);
      return (response)
    }));
  }

  deleteItemInApi(params:any,action:any){
    return this.http.deteteDataFromServer(action,params).pipe(map((response:any)=>{
      return true;
    }));
  }


}