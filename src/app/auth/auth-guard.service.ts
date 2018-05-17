import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const can = this.authService.isAuthenticated();
    if (!can) {
      this.router.navigate(['/signin']);
    }
    return can;
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    const can = this.authService.isAuthenticated();
    if (!can) {
      this.router.navigate(['/signin']);
    }
    return can;
  }

}
