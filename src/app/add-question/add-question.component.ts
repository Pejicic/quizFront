import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../services/question/question.service';
import { QuestionDto } from '../model/QuestionDto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  model: NgbDateStruct;
  selectedFile:File=null;
    dto:QuestionDto;
    message: String = '';
  type = '';

  constructor(private service:QuestionService, private router:Router) { }

  ngOnInit() {
    var currentUser = JSON.parse(
      localStorage.getItem('currentUser'));

if( currentUser==null || currentUser.role!="ADMIN" ){
this. router.navigate(["main"])}
    


    this.dto = {
      category:'',
      date:'',
      text:'',
      type:'',
      answer: '',
      numOfAnswers:0,
      points: 0,
    }

  }

  closeFix(event, datePicker) {
    if(event.target.offsetParent == null)
      datePicker.close();
    else if(event.target.offsetParent.nodeName != "NGB-DATEPICKER")
      datePicker.close();
  }

  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];


  }


  save(){

    this.dto.date=this.model.day+"/"+this.model.month+"/"+this.model.year;
    if(this.selectedFile==null){this.service.saveQuestions(this.dto).subscribe(data => {
      this.message="Pitanje je uspješno dodato."
      this.type="success"
      setTimeout(() => 
      {
        window.location.reload()},
      5000)

     },
       error => {
        this.message="Došlo je do greške. Pitanje nije dodato."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)

      }
     );}
    
    else{
    this.service.answer(this.dto,this.selectedFile).subscribe(data => {
      this.message="Pitanje je uspješno dodato."
      this.type="success"
      setTimeout(() => 
      {
        window.location.reload()},
      5000)

    },
      error => {
        this.message="Došlo je do greške. Pitanje nije dodato."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)
      }
    );
    }
  }

}
