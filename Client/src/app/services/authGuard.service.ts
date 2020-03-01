import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Role } from '../user/user.model';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('currentUser')) {
      return JSON.parse(sessionStorage.getItem('currentUser')).role === Role.User || Role.Admin ? true : false;
    }
    this.router.navigate(['user/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('currentUser') ? true : false;
  }

  isUser(): boolean {
      if(sessionStorage.getItem('currentUser')) {
        return JSON.parse(sessionStorage.getItem('currentUser')).role === Role.User ? true : false;
      }
  }
}
