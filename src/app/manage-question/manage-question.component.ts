import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionService } from '../services/question/question.service';
import { QuestionDto } from '../model/QuestionDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css'],

})
export class ManageQuestionComponent implements OnInit {

  questions:QuestionDto[];
  message:String="";
  type="";

  constructor(private service:QuestionService, private router:Router) { }

  ngOnInit() {
    var currentUser = JSON.parse(
      localStorage.getItem('currentUser'));

if( currentUser==null || currentUser.role!="ADMIN" ){
this.router.navigate(["main"])}
    

    this.service.getQuestions().subscribe(data => {
      this.questions=data;
     },
       error => {
        console.log(error.statusText)
       }
     );


  }



  liveSearch(){

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
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


  delete(id:number){


    this.service.delete(id).subscribe(data => {
      if(data==true){
        this.message="Pitanje sa id: "+id+" je obrisano."
        this.type="success"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)      }
      window.location.reload();

    },
       error => {
        this.message="Došlo je do greške. Pitanje sa id: "+id+" nije obrisano."
        this.type="danger"

        setTimeout(() => 
      {
        window.location.reload()},
      5000)       }
     );
  }
  
    


}
