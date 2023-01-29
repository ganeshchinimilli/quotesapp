import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';



@Injectable({
  providedIn: 'root'
})
export class AnonymusguardGuard implements CanActivate {
  constructor(private token:TokenService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.token.isLoggedIn()){
        this.router.navigate(['profile']);
        return false;
      }
      else{
        // this.router.navigate(['/login']);
        return true;
      }
  }


}
