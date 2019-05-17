import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectusersService } from './collectusers.service';

@Injectable({
  providedIn: 'root'
})
export class MyCanActivateGuard implements CanActivate {
  
  
  private item: any;

  constructor(private route: Router, private service: CollectusersService){}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.item = this.service.getCachedData().results
                  .filter(data => next.params['uuid'] == data.login.uuid);

      if(this.item.length < 1) this.route.navigate(['err']);
      else return true;
  }
  
}
