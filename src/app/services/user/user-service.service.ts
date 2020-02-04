import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserDto } from 'src/app/model/UserDto';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/model/LoginDto';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  readonly Url = "api/user";

  constructor(private http: HttpClient) { }


  register(user: UserDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.Url}/register`, JSON.stringify(user), {
        headers: this.headers
      })
      
  }

  block(user: String): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.Url}/block`, JSON.stringify(user), {
        headers: this.headers
      })
      
  }

  unblock(user: String): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.Url}/unblock`, JSON.stringify(user), {
        headers: this.headers
      })
      
  }
  editPassword(user:LoginDto):Observable<boolean>{
   return this.http.put<boolean>(`${this.Url}/editPassword`, JSON.stringify(user), {
    headers: this.headers
  })}

  editData(user:UserDto):Observable<UserDto>{
    return this.http.put<UserDto>(`${this.Url}/editData`, JSON.stringify(user), {
     headers: this.headers
   })}


  getUser():Observable<UserDto>{
    return this.http.get<UserDto>(`${this.Url}/loggedUser`,{
      headers: this.headers
    })
  }

  getUsers():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(`${this.Url}/getAll`,{
      headers: this.headers
    })
  }

}
