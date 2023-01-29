import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AuthStateService } from '../services/auth-state.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService} from "../services/notification.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted =false;
  errors:any = null;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private NotificationService:NotificationService,
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
  const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern(PAT_EMAIL)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.SpinnerService.show();
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
        this.NotificationService.showSuccess('Logged in Successfully','');
        this.authState.setAuthState(true);
        this.loginForm.reset();
        window.location.reload();
        this.router.navigate(['login']);
      },
      (error) => {
        this.errors = error.error;
        this.NotificationService.showError(this.errors.message,'');
      },
    );
    this.SpinnerService.hide();

  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }
}
