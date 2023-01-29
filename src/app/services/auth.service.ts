import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globalvariables } from '../globalvariables';


export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

   }
   register(user: User): Observable<any> {
    return this.http.post( Globalvariables.appUrl+'auth/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(Globalvariables.appUrl+'auth/login',user);
  }
  signout():Observable<any> {
    return this.http.get<any>(Globalvariables.appUrl+'auth/logout');
  }
  getProfile():Observable<any> {
    return this.http.get<any>(Globalvariables.appUrl+'auth/profile');
  }
}
