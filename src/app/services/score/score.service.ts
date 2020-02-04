import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreDto } from 'src/app/model/ScoreDto';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private headers = new HttpHeaders();
  readonly Url = 'api/score';

  constructor(private http: HttpClient) { }



  getScores():Observable<ScoreDto[]>{
    return this.http.get<ScoreDto[]>(`${this.Url}/getAll`,{
      headers: this.headers
    })
  }
}
