import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Role } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('currentUser')) {
      
      return JSON.parse(sessionStorage.getItem('currentUser')).role === Role.Admin ? true : false;
    }
    this.router.navigate(['user/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isAdmin() {
    if(sessionStorage.getItem('currentUser')) {
      return JSON.parse(sessionStorage.getItem('currentUser')).role === Role.Admin ? true : false;
    }
  }
}
