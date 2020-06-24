  
import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

    isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false' )

    constructor(
      private router: Router
    ) {}

    setLoggedIn(value: boolean){
      this.isLoggedIn= value;
      if (value == true){
      localStorage.setItem('loggedIn', 'true')
      }else{
      localStorage.setItem('loggedIn', 'false')
      this.router.navigate([''])
      }
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    }
}