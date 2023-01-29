import { AuthService } from './../services/auth.service';
import { NotificationService } from './../services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
// import { AuthService } from '../services/auth.service';

// import { NotificationService } from '../services/notification.service';
// User interface
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  UserProfile :any[]=[];
  in=5;
  constructor(private http:HttpClient,private NotificationService:NotificationService,
    private SpinnerService: NgxSpinnerService, private AuthService:AuthService){
    this.refresh(true);
  }
  ngOnInit() {}
  refresh(parameter:boolean=false){
    this.UserProfile =[];
    this.SpinnerService.show();
    for (let i = 0; i < 5; i++) {
      this.http.get('https://api.kanye.rest',{headers:{skip:"true"}})
        .subscribe(data => {
          this.UserProfile.push(data);
        });
    }
    if(!parameter){
      this.NotificationService.showSuccess('Quotes Refreshed Successfully','');
    };
    this.SpinnerService.hide();
  }
}
