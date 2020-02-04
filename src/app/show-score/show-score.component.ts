import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score/score.service';
import { ScoreDto } from '../model/ScoreDto';

@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowScoreComponent implements OnInit {

  scores:ScoreDto[];


  constructor(private router:Router, private scoreService:ScoreService) { }

  ngOnInit() {

    document.getElementById("userData").style.display='none';
    document.getElementById("changeData").style.display='none';
    document.getElementById("timeRemaining").style.display='none';

    document.getElementById("showResult").style.visibility='visible';

    this.scoreService.getScores().subscribe(data => {
      this.scores=data;
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
