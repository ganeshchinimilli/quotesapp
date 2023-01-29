import { NotificationService } from './services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  title: any;
  profile :any;
  constructor(
    public auth: AuthStateService,
    public router: Router,
    public AuthService:AuthService,
    private token: TokenService,
    private NotificationService:NotificationService
  ) {}
  ngOnInit() {
    this.auth.userAuthState.subscribe((val:any) => {
      this.isSignedIn = val;
    });
  }
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.NotificationService.showSuccess('Logged Out Successfully','');
    this.router.navigate(['login']);
  }
}
