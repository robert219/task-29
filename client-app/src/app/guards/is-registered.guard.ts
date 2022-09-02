import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsRegisteredGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isUserRegisterd = Boolean(sessionStorage.getItem('registered_user'));

    if (isUserRegisterd) return isUserRegisterd;
    else return this.router.parseUrl('/registration');
  }
}
