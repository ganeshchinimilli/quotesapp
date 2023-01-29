import { NotificationService } from './../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  public isFormSubmitted=false;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    public NgxSpinnerService:NgxSpinnerService,
    public NotificationService:NotificationService,
  ) {
  const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
  const PAT_NAME = "^[A-Za-z][A-Za-z0-9_]{4,29}$";
    this.registerForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(4),Validators.pattern(PAT_NAME)]],
      email: ['',[Validators.required,Validators.pattern(PAT_EMAIL)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      password_confirmation: ['',[Validators.required, Validators.minLength(6)]],
    },
    {  validators:this.ConfirmedValidator('password', 'password_confirmation'),}
    );
  }
  ngOnInit() {}
  ConfirmedValidator(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          console.log(control);
          const matchingControl = formGroup.controls[matchingControlName];
          console.log(matchingControl);

          if (matchingControl?.errors && !matchingControl?.errors.confirmedValidator) {
              return;
          }
          if (control?.value !== matchingControl?.value) {
              matchingControl?.setErrors({ confirmedValidator: true });
          } else {
              matchingControl?.setErrors(null);
          }
      }
  };
  onSubmit() {
    console.log(this.registerForm.value);
    this.isFormSubmitted = true;
    if(!this.registerForm.valid) {
      return false;
    };
    this.NgxSpinnerService.show();
    this.authService.register(this.registerForm.value).subscribe(
      (result: any) => {
        if(result.status){
          this.NotificationService.showSuccess(result.message,'');
          this.registerForm.reset();

          this.router.navigate(['login']);
          return true;
        }else{
          this.NotificationService.showError(result.message,'');
          return false;
        };
      },
      (error: { error: any; }) => {
        console.log(error);
        this.errors = error.error;
        this.NotificationService.showError(this.errors.message,'');
      },
    );
    this.NgxSpinnerService.show();
    return true;
  }
}
