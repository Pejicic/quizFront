import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsDto } from '../model/SettingsDto';
import { QuestionService } from '../services/question/question.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})
export class MainPageComponent implements OnInit {

  static settingsDto:SettingsDto


  constructor(private router: Router,private service:QuestionService) { 

  }

  ngOnInit() {



    var login: HTMLElement = document.getElementById('loginPage');
    login.hidden=true;

    var countdown: HTMLElement = document.getElementById('countdownPage');

    if(countdown.hidden==true){
      login.hidden=false;
    }



    
  
  


  }

  
    
  

}
