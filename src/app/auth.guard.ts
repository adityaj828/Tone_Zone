import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router, private location: Location) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.location.path() === '/admin/login' && (!this.authService.isLoggedIn())) {
        return true;
      }
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/admin/login']);
        return false;
      }
      if (this.location.path() === '/admin/login') {
        this.router.navigate(['/dashboard']);
      }
      return true;
  }

}
