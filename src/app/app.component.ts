import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshop';
  // Subscribing to the user$ observable of our authentication service to redirect them to the appropriate page
  constructor(private auth: AuthService, private router: Router,
    private userService: UserService) {
    auth.user$.subscribe(user => {
      if(!user) return; //if the user is loggedin we read returnUrl item from the localstorage and navigate

      userService.save(user); // Storing user to the DB everytime they login | Since we don't have the concept of registeration
        
      // if we have a user we are going to read local storage
      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;

      // To remove returnUrl once users are logged in to avoid redirect to the 'index' page on page reloads
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
