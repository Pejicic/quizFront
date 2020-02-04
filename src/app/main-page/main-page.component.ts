import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit() {

    var login: HTMLElement = document.getElementById('loginPage');
    login.hidden=true;

    var countdown: HTMLElement = document.getElementById('countdownPage');

    if(countdown.hidden==true){
      login.hidden=false;
    }





  }

}
