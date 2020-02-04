import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
import { UserDto } from '../model/UserDto';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { LoginDto } from '../model/LoginDto';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  dto:UserDto;
  log:LoginDto;
  pass:boolean=false;
  data:boolean=false;
  message:String="";
  type="";
  constructor(private userService:UserServiceService) { }

  ngOnInit() {
    this.log={
      username:"",
      password:""
    }

    this.dto={
      username:"",
      password:"",
      repeatPass:"",
      name:"",
      email:"",
      country:""

    }
  }

  changePassword(){

    this.pass=true;
    this.data=false;



  }

  changeData(){
    this.pass=false;
    this.data=true;

  }

  savePasswordChange(){


    this.userService.editPassword(this.log).subscribe(data => {
      this.message="Lozinka je uspješno izmijenjena."
        this.type="success"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)

     },
       error => {
        this.message="Došlo je do greške. Lozinka nije izmijenjena."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)       }
     );

  }

  saveDataChange(){

    this.userService.editData(this.dto).subscribe(data => {
      this.message="Podaci su uspješno izmijenjeni."
      this.type="success"

      setTimeout(() => 
    {
      window.location.reload()},
    5000)

     },
       error => {
        this.message="Došlo je do greške. Podaci nisu izmijenjeni."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)       }
     );

  }

}
