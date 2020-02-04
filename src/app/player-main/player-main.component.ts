import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
import { UserDto } from '../model/UserDto';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PlayerMainComponent implements OnInit {
   user:UserDto;
  constructor( private userService:UserServiceService) { }

  ngOnInit() {
    this.user={
      username:"bdfbd",
      password:"",
      repeatPass:"",
      name:"Jelena",
      email:"dfsgfhjdgs",
      country:"vfdv"

    }
    
    this.userService.getUser().subscribe(data => {
      this.user=data;
     
    },
      error => {
       alert(error)
      }
    );
  }

}
