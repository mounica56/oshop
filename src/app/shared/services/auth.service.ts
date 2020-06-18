import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app.user';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/operators';
import { Observable , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$ : Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
     // Firebase User type Observable representing the authentication state of the current user
      this.user$ = afAuth.authState; // Not subscribing the oberservable here, instead we'll conver it into App User Observable below
  }

  login() {
    // Store the return URL in local storage
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    // send google for authentication
    // signInWithRedirect() takes an auth provider object
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    // uid is the property of the 'user' object is the user represented by firebase as part of authentication and not the user object stored in the database
    // We need to get the firebase 'user' object to read and read the actual application 'user' object from the database
    // BASICALLY CONVERTING THE FIREBASE USER OBSERVABLE TO APPUSER(Actual implementation in the FB DB) OBSERVABLE
    return this.user$.pipe(
      switchMap(user => {
        if(user) 
          return this.userService.get(user.uid);
        else
          return of(null);
      })
    );
  }

}
