import { UtilService } from "../util/util.service";
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private util: UtilService) {};
  canActivate() {

    if(!localStorage.getItem('jwt')){
        this.util.redirectTo('./login'); 
        return false;
    }
   
    this.util.getUserByToken(this.util.getToken().access_token).subscribe(data => {
        if (data) {
            return true;
        } else {
            this.util.redirectTo('./login');
            return false;
        }
    },
    error => {
      this.util.redirectTo('./login');
      return false;
    });
  }
}