import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../model/LoginDto';
import { UserDto } from '../model/UserDto';
import { AuthenticationService } from '../services/authentication.service';
import { UserServiceService } from '../services/user/user-service.service';
import { Router } from '@angular/router';
import { SettingsDto } from '../model/SettingsDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginDto:LoginDto;
  registerDto:UserDto;
  message: String = '';
  type = '';
  grecaptcha: string="";

  constructor(private autenticationService:AuthenticationService,private userService:UserServiceService, private router:Router) {  
    
     }

  ngOnInit() {
    
    this.loginDto={
      username:"",
      password:""
    }

    this.registerDto={
      username:"",
      password:"",
      repeatPass:"",
      role:"",
      name:"",
      email:"",
      country:""

    }

  }
  
  login(){

    
        if (this.grecaptcha=="") {
          this.message="Recaptcha nije verifikovana. Pokušajte ponovo. "
          this.type="danger"
          setTimeout(() => 
          {
            window.location.reload()},
          5000)      
          return}

    this.autenticationService.login(this.loginDto,this.grecaptcha).subscribe(data => {
    
      if(data.role!=null){
        this.message='Uspjesno ste se ulogovali.'
        this.type='success'
      
      localStorage.setItem('currentUser', JSON.stringify({ username: this.loginDto.username, role:data.role, token: data.token}));
      if(data.role==environment.ROLES[1]){
        setTimeout(() => 
{
  this.router.navigate(['userManage'])},
5000);

        
      }
      if(data.role==environment.ROLES[0]){
        setTimeout(() => 
{
  this.router.navigate(['playerMain'])},
5000);

        
      }

      }
      else{
      this.message="Unijeli ste pogrešno korisničko ime ili lozinku. Pokušajte ponovo. "
      this.type="danger"
      setTimeout(() => 
      {
        window.location.reload()},
      5000);}

     },
       error => {
        console.log(error.statusText)
        this.message="Unijeli ste pogrešno korisničko ime ili lozinku. Pokušajte ponovo. "
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000);}
        
       
     );

  }

  register(){
    this.userService.register(this.registerDto).subscribe(data => {
    
      if(data==true){
        this.message="Uspješno ste se registrovali. Ulogujte se da bi pristupili sajtu. "
        this.type="success"
        setTimeout(() => 
      {
        window.location.reload()},
      5000);

      }
      else{
        this.message="Došlo je do greške prilikom registracije. "
        this.type="danger"
        setTimeout(() => 
      {
        window.location.reload()},
      5000);
      }


     },
       error => {
        console.log(error.statusText)
        this.message="Došlo je do greške prilikom registracije. "
        this.type="danger"
        setTimeout(() => 
      {
        window.location.reload()},
      5000);
       }
     );

  }

  public resolved(captchaResponse: string) {
    this.grecaptcha=captchaResponse;


  }

  
  }



