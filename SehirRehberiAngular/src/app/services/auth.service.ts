import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { BrowserModule } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService) { }

  path = "http://localhost:64984/api/auth/";
  TOKEN_KEY = "token"
  userToken: any;
  decodeToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();


  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "register", registerUser, { headers: headers }).subscribe(data => {
    });

  }

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodeToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.succes("Sisteme giriş yapıldı");
        this.router.navigateByUrl("/city");

      }, error => {

        if (error.status == 401) {
          this.alertifyService.error("Kullanıcı adı veya Parola yanlış");
        }
      });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Sistemden çıkış yapıldı");
  }

  loggedIn() {
    return this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN_KEY))
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid
  }
}
