import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CanAccessDashboardGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly isAdminService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAdminService.isAdministrator$.pipe(
      map(canAccess => canAccess ? canAccess : this.router.createUrlTree(['/ingresar']))
    );
  }

}
