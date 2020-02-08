import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsDto } from '../model/SettingsDto';
import { QuestionService } from '../services/question/question.service';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  curday:number;
  secTime:number;
  ticker:any;
   settingsDto:SettingsDto=<SettingsDto>{}
  
  

  daysUntil:string=""
  hoursUntil:string=""
  minutesUntil:string=""
  secondsUntil:string=""


  constructor(private router: Router, private service:QuestionService) {


    

    

   }

  ngOnInit() {
    this.service.getSettings().subscribe(data => {
    this.settingsDto=data
          
            
        },
          error => {
           console.log(error.statusText)
          }
        );
    
    
 
    console.log(JSON.stringify(this.settingsDto))

    

    this.getSeconds()
  
  }


 

 
getSeconds() {
  console.log(JSON.stringify(this.settingsDto))

 var nowDate = new Date();
 var dy = this.settingsDto.dayOfQuiz; //Sunday through Saturday, 0 to 6
 var countertime = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),this.settingsDto.hoursBegin,this.settingsDto.minutesBegin,0)); //20 out of 24 hours = 8pm
 
 var curtime = nowDate.getTime(); //current time in milliseconds
 var atime = countertime.getTime(); //countdown time
 var diff = ((atime - curtime)/1000);// in seconds
 if (diff > 0) { this.curday = dy - nowDate.getDay() }
 else { this.curday = dy - nowDate.getDay()- 1 } //after countdown time
 if (this.curday < 0) { this.curday += 7; } //already after countdown time, switch to next week
 if (diff <= 0) { diff += (86400 * 7) }
 this.startTimer (diff);
}
 
startTimer(secs) {
 this.secTime = parseInt(secs);
 this.ticker = setInterval(() => { this.tick(); },1000);
 //this.tick(); //initial count display
}
 
tick() {
 var secs = this.secTime;
 if (secs>0) {
  this.secTime--;
 }
 else {
  clearInterval(this.ticker);
  this.getSeconds(); //start over
 }
 
 var days = Math.floor(secs/86400);
 secs %= 86400;
 var hours= Math.floor(secs/3600);
 secs %= 3600;
 var mins = Math.floor(secs/60);
 secs %= 60;
 

 var hour = new Date().getUTCHours();
    var minutes=new Date().getUTCMinutes();
    var currDay = new Date();
    var start=this.settingsDto.hoursBegin*60+this.settingsDto.minutesBegin;
    var now=hour*60+minutes;
    var end=this.settingsDto.hoursEnd*60+this.settingsDto.minutesEnd;
 //update the time display
 if(currDay.getUTCDay()==this.settingsDto.dayOfQuiz && (start<=now && now<=end)){

    clearInterval(this.ticker);
  var countdown: HTMLElement = document.getElementById('countdownPage');
  countdown.style.display='none';
  var login: HTMLElement = document.getElementById('loginPage');
  login.hidden=false; 

}
 else{

 this.daysUntil="0"+this.curday;
 this.hoursUntil=((hours < 10 ) ? "0" : "" ) + hours;
this.minutesUntil=( (mins < 10) ? "0" : "" ) + mins;
 this.secondsUntil=( (secs < 10) ? "0" : "" ) + secs;
}
  }   }
  


