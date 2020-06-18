import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import * as firebase from 'firebase';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//protecting the routes in the url
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) { }

  canActivate(route, state: RouterStateSnapshot) { 
    // with this paramter -> route, state: RouterStateSnapshot->RouterStateSnapshot we can get the url that user try to access when this authguard is clicked in
    // which should return true or false of authentication status of the current user
    // if the user is logged in we return true otherwise we navigate them to login page and return false
    return this.auth.user$.pipe(
      map(user => {
      if(user) return true;

      this.router.navigate(['/login'],{ queryParams: { returnUrl : state.url}});
      return false;
    })
    );
  }
}
