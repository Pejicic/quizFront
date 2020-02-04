import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JwtUtilsService } from './security/jwt-utils.service';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/LoginDto';
import { UserDto } from '../model/UserDto';
import { TokenDto } from '../model/TokenDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginPath = 'api/user'
    private headers = new HttpHeaders({ "Content-Type": "application/json" });

    constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService) { }

    login(user:LoginDto,param:any):Observable<TokenDto>{
        console.log(user.username)
      var token = '';
      var role = '';
      return this.http.post<TokenDto>(`${this.loginPath}/login`, JSON.stringify(user), {
        headers: this.headers,
        params:{'g-recaptcha-response':param}
      })
    }

      getToken(): String {
        var currentUser = JSON.parse(
            localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token ? token : "";
    }
getUsername():string{
    var currentUser = JSON.parse(
        localStorage.getItem('currentUser'));
        var username=currentUser && currentUser.username;
        return username ? username : "";
}


    logout(): void {
        localStorage.removeItem('currentUser');

    }

    isLoggedIn(): boolean {
        if (this.getToken() != '') return true;
        else return false;
    }

    getCurrentUser() {
        if (localStorage.currentUser) {
            return JSON.parse(localStorage.currentUser);
        }
        else {
            return undefined;
        }


    }

}
