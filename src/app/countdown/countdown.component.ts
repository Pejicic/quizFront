import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  curday:number;
  secTime:number;
  ticker:any;
  
  constructor(private router: Router) { }

  ngOnInit() {

    var hour = new Date().getUTCHours();
    var minutes=new Date().getUTCMinutes();
    var currDay = new Date();
    var start=environment.hoursBegin*60+environment.minutesBegin;
    var now=hour*60+minutes;
    var end=environment.hoursEnd*60+environment.minutesEnd;
    if(currDay.getUTCDay()==environment.dayOfQuiz){
      if(start<=now && now<=end){
        console.log(end)

      var countdown: HTMLElement = document.getElementById('countdownPage');
      countdown.hidden=true;
      var login: HTMLElement = document.getElementById('loginPage');
      login.hidden=false; 
    }}
    
    this.getSeconds()
  
  }


 
getSeconds() {
 var nowDate = new Date();
 var dy = environment.dayOfQuiz; //Sunday through Saturday, 0 to 6
 var countertime = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),environment.hoursBegin,environment.minutesBegin,0)); //20 out of 24 hours = 8pm
 
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
 this.tick(); //initial count display
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
 
 //update the time display
 if(this.curday==0 && hours==0 && mins==0 && secs==1){
  var countdown: HTMLElement = document.getElementById('countdownPage');
  countdown.hidden=true;
  var login: HTMLElement = document.getElementById('loginPage');
  login.hidden=false;
  return
 }
 document.getElementById("days").innerHTML = "0"+this.curday;
 document.getElementById("hours").innerHTML = ((hours < 10 ) ? "0" : "" ) + hours;
 document.getElementById("minutes").innerHTML = ( (mins < 10) ? "0" : "" ) + mins;
 document.getElementById("seconds").innerHTML = ( (secs < 10) ? "0" : "" ) + secs;
  }   }
  


