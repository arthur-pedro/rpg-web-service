import { UtilService } from "../util/util.service";
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class OnlyManagerGuard implements CanActivate {

  user: any = null;

  constructor(private util: UtilService) {};
  canActivate() {

    if(!localStorage.getItem('jwt')){
        this.util.redirectTo('./login'); 
        return false;
    }
   
    this.util.getLoggedUser().subscribe(data => {
        this.user = data;
        if (this.user && this.user.manager) {
            return true;
        } else {
            this.util.redirectTo('./main');
            return false;
        }
    }, error => {
      this.util.redirectTo('./login');
      return false;
    });
  }
}