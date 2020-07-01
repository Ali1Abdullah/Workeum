import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class AdminAuthService {
  private headers: HttpHeaders;
  private accessPointUrl: string = "http://localhost:3001";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }


  public authBolMember(payload) {
    return this.http.post(this.accessPointUrl +'/api/login/user' ,payload,  {responseType: 'text'});
  }

  public authBolAdmin(payload) {
    return this.http.post(this.accessPointUrl +'/api/login/admin' ,payload, {headers: this.headers});
  }

  public authBolCompany(payload) {
    return this.http.post(this.accessPointUrl +'/api/login/company' ,payload, {headers: this.headers});
  }


  
}