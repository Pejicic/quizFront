import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionDto } from 'src/app/model/QuestionDto';
import { SettingsDto } from 'src/app/model/SettingsDto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private headers = new HttpHeaders();
  readonly Url = 'api/question';

  constructor(private http: HttpClient) { }


  answer(dto: QuestionDto,file: File): Observable<boolean> {
    let formData:FormData = new FormData();
    formData.append('dto', new Blob([JSON.stringify(dto)], {
      type: "application/json"
  }));
  
    formData.append('file', file);
    return this.http
      .post<boolean>(`${this.Url}/upload`, formData, {
        headers: this.headers
      })
      
  }

  saveQuestions(dto: QuestionDto):Observable<boolean>{
    return this.http.post<boolean>(`${this.Url}/saveQuestion`,JSON.stringify(dto),{
      headers:  new HttpHeaders({ "Content-Type": "application/json" })
    })
  }


  getQuestions():Observable<QuestionDto[]>{
    return this.http.get<QuestionDto[]>(`${this.Url}/getAll`,{
      headers: this.headers
    })
  }


 getSettings():Observable<SettingsDto>{
    return this.http.get<SettingsDto>(`${this.Url}/getSettings`,{
      headers: this.headers
    })
  }
  getSetting() {

    const promise = this.http.get(`${this.Url}/getSettings`)
    .toPromise();
    
        return promise
  }


  delete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.Url}/delete/${id}`,{
      headers: this.headers
    })
  }


}

