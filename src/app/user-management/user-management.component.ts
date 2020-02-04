import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDto } from '../model/UserDto';
import { UserServiceService } from '../services/user/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserManagementComponent implements OnInit {

  users:UserDto[];
  message:String="";
  type="";

  constructor(private service: UserServiceService, private router:Router ) { }

  ngOnInit() {
    var currentUser = JSON.parse(
      localStorage.getItem('currentUser'));

if( currentUser==null || currentUser.role!="ADMIN" ){
 this.router.navigate(["main"])}
    
    this.service.getUsers().subscribe(data => {
      this.users=data;
     },
       error => {
        console.log(error.statusText)
       }
     );

  }

  block(username:string){
     alert(username)

    this.service.block(username).subscribe(data => {
      if(data==true){
        this.message="Korisnik sa korisničkim imenom: "+username+" je blokiran."
        this.type="success"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)


      }
      else{


        this.message="Došlo je do greške. Korisnik sa korisničkim imenom: "+username+" nije blokiran."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)

      }




     },
       error => {
        this.message="Došlo je do greške. Korisnik sa korisničkim imenom: "+username+" nije blokiran."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)       }
     );

  }


  unblock(username){

    this.service.unblock(username).subscribe(data => {
      if(data==true){
        this.message="Korisnik sa korisničkim imenom: "+username+" je odblokiran."
        this.type="success"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)

      }
      else{
        this.message="Došlo je do greške. Korisnik sa korisničkim imenom: "+username+" nije odblokiran."
      this.type="danger"

      setTimeout(() => 
    {
      window.location.reload()},
    5000)}

     },
       error => {
        this.message="Došlo je do greške. Korisnik sa korisničkim imenom: "+username+" nije odblokiran."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)       }
     );

  }



  liveSearch(){

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

  }


