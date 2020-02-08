import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score/score.service';
import { ScoreDto } from '../model/ScoreDto';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.css']
})
export class ShowScoreComponent implements OnInit {

  scores:ScoreDto[];


  constructor(private router:Router, private scoreService:ScoreService, private authService:AuthenticationService) { }

  ngOnInit() {


    this.scoreService.getScores().subscribe(data => {
      this.scores=data;
     },
       error => {
        console.log(error.statusText)
       }
     );


  }


  logout(){
    this.authService.logout()  
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
