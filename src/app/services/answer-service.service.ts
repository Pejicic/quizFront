import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SimDto } from '../model/SimDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  readonly Url = 'api/answer';

  constructor(private http: HttpClient) { }


  answer(sim: SimDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.Url}/simulation`, JSON.stringify(sim), {
        headers: this.headers
      })
      
  } }
