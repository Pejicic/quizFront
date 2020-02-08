import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { SettingsDto } from '../model/SettingsDto';
import { QuestionService } from '../services/question/question.service';

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css'],
})
export class PlayerHeaderComponent implements OnInit {
  secTime:number;
  ticker:any;
  minutesUntil:string=""
  secondsUntil:string=""
  settingsDto:SettingsDto=<SettingsDto>{}
   //uvijek sat manje nego sto je kod nas
  
 
  constructor(private autService:AuthenticationService, private router:Router,private service:QuestionService) { 
  }

  ngOnInit() {
    this.service.getSettings().subscribe(data => {
      this.settingsDto=data
            
              
          },
            error => {
             console.log(error.statusText)
            }
          );
      
   

    this.getSeconds()
  }

  logout(){
    this.autService.logout()  
    }
    data(){
      this.router.navigate(['playerMain'])

    }
    editData(){
      this.router.navigate(['editData'])

    }

    
    


    getSeconds(){
      var nowDate = new Date();
      var countertime = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),this.settingsDto.hoursEnd,this.settingsDto.minutesEnd,0)); //20 out of 24 hours = 8pm
      
      var curtime = nowDate.getTime(); //current time in milliseconds
      var atime = countertime.getTime(); //countdown time
      var diff = ((atime - curtime)/1000);// in seconds
      this.startTimer (diff);
    }
    
    startTimer(secs) {
      this.secTime = parseInt(secs);
      this.ticker = setInterval(() => { this.tick(); },1000);
      //this.tick(); //initial count display
     }
      
     tick() {
      var secs = this.secTime;
      if (secs>2) {
       this.secTime--;
      }else if(secs==2){
        this.router.navigate(['gameTime']) 
        clearInterval(this.ticker);

      }
      else {
        clearInterval(this.ticker);
         this.getSeconds()
      }
      
      var mins = Math.floor(secs/60);
      secs %= 60;
      
      var hour = new Date().getUTCHours();
      var minutes=new Date().getUTCMinutes();
    var currDay = new Date();
    var start=this.settingsDto.hoursBegin*60+this.settingsDto.minutesBegin;
    var now=hour*60+minutes;
    var end=this.settingsDto.hoursEnd*60+this.settingsDto.minutesEnd;
 //update the time display
 if(now>=end){
  clearInterval(this.ticker);

  this.router.navigate(['gameTime']) 

}
else{
  this.minutesUntil=( (mins < 10) ? "0" : "" ) + mins+" minuta";
 
  this.secondsUntil=( (secs < 10) ? "0" : "" ) + secs+" sekundi do kviza";
  

}
  

       
       }  

    

}



