import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { LoginDto } from '../model/LoginDto';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router } from '@angular/router';
import { QuestionDto } from '../model/QuestionDto';
import { AnswerDto } from '../model/AnswerDto';
import { SettingsDto } from '../model/SettingsDto';
import { QuestionService } from '../services/question/question.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
  
})
export class GameComponent implements OnInit {
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  message: String = '';
  type = '';
  stompClient: any;
  question: QuestionDto;
  answerDto: AnswerDto;
  performance:number=59;
  q:String="";
  secondsLeft:string=""
  audio:any=new Audio()
  playMusic:boolean=false;
  showVideo:boolean=false;
  showImage:boolean=false;

  buttonEnable:boolean=true; 
  end:boolean=false;
  imagePath:string="('../../assets/sipa.jpg";
  settingsDto:SettingsDto=<SettingsDto>{}

  constructor(private router:Router,private service:QuestionService ) { }
  
  ngOnInit() {
    this.service.getSettings().subscribe(data => {
      this.settingsDto=data  
              
          },
            error => {
             console.log(error.statusText)
            }
          );  

    this.answerDto={
      id:0,
      answer:'',
      time:0

    }

    this.question= {
      id:0,
      category:'',
      date:'',
      text:'',
      type:'',
      answer: '',
      numOfAnswers:0,
      points: 0,
      path:''
    }
    this._connect()
    
  }

  

  play(){
    this.audio.src = "../../../assets/"+this.question.path;
    this.audio.load();
    this.audio.play();
  }
  
startCountdown(){
    var counter = 60;
   this.showImage=false;
   this.showVideo=false;
    this.playMusic=false;
    this.message=""
    this.type=""
    this.answerDto.answer=""
    this.buttonEnable=true;
    this.answerDto.id=this.question.id;
    this.audio.src=""
    this.performance=performance.now();
    if(this.question.type=="MUSIC"){
      this.playMusic=true;

    }
    else if(this.question.type=="PICTURE" || this.question.type=="ASSOCIATION" ){
      this.imagePath="('../../assets/"+this.question.path;
       this.showImage=true;
    }
    else if(this.question.type=="VIDEO"){
      this.imagePath="('../../assets/"+this.question.path;
      this.showVideo=true;
    }
   
    var interval = setInterval(() => {
      this.secondsLeft=( (counter < 10) ? "0" : "" ) + counter+" sekundi";
      this.q=this.question.text

      counter--;
  
      if(counter == 0 ){
        clearInterval(interval);
        this.getEnd()
        if(this.end==true ){
         this._disconnect()
          this.router.navigate(["/showScore"])
          
        }
      };
    }, 1000);
  };
  

  odgovori(){
   this.audio.src=""
   this.answerDto.time=performance.now()-this.performance;
   this._send(this.answerDto)
   this.message="Vaš odgovor je sačuvan. Sačekajte vrijeme za naredno pitanje."
   this.type="info"
   this.buttonEnable=false;
  }

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({token: JSON.parse(
        localStorage.getItem('currentUser')).token}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent:QuestionDto) {
            _this.onMessageReceived(sdkEvent);
        });
    }, this.errorCallBack);
};

_disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    else{
        alert("stomp empty")
    }
}

errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
}

_send(message) {
  console.log("calling logout api via web socket");
  this.stompClient.send("/app/hello", {}, JSON.stringify(message));

  //this.stompClient.send("/app/hello", {}, JSON.stringify(message));
}

onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message.body);
    this.question=JSON.parse(message.body);
      this.startCountdown()
}

   getEnd(){
  var nowDate = new Date();
  var countertime = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),this.settingsDto.quizFinishedHours,this.settingsDto.quizFinishedMinutes,0)); //20 out of 24 hours = 8pm
  
  var curtime = nowDate.getTime(); //current time in milliseconds
  var atime = countertime.getTime(); //countdown time
  var diff = ((atime - curtime)/1000);// in seconds

  console.log(diff)

  if (diff-5<=0){
    this.end=true
  }
  else{
    this.end= false

  }
}


 

}
