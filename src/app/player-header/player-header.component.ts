import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css']
})
export class PlayerHeaderComponent implements OnInit {
  secTime:number;
  ticker:any;
   //uvijek sat manje nego sto je kod nas
  
 
  constructor(private autService:AuthenticationService, private router:Router) { }

  ngOnInit() {

    this.getSeconds()
  }

  logout(){
    this.autService.logout()  
    }
    data(){
      this.router.navigate(['/playerMain'])

    }
    editData(){
      this.router.navigate(['/editData'])

    }
    table(){
      this.router.navigate(['/showScore'])

    }


    getSeconds(){
      var nowDate = new Date();
      var countertime = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),environment.hoursEnd,environment.minutesEnd,0)); //20 out of 24 hours = 8pm
      
      var curtime = nowDate.getTime(); //current time in milliseconds
      var atime = countertime.getTime(); //countdown time
      var diff = ((atime - curtime)/1000);// in seconds
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
        //this.router.navigate(['/gameTime'])
        return
      }
      
      var mins = Math.floor(secs/60);
      secs %= 60;
      
      
      document.getElementById("minutes").innerHTML = ( (mins < 10) ? "0" : "" ) + mins+" minuta";
      document.getElementById("seconds").innerHTML =( (secs < 10) ? "0" : "" ) + secs+" sekundi do kviza";
       }  

    

}



