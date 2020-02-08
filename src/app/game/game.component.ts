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
  buttonEnable:boolean=true; 
  end:boolean=false;
  hello:string="milky-way-2695569_1920.jpg";
  imagePath:string="('../../assets/backgrounds/"+this.hello;
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
    this._connect();


    


    

  }

  

  play(){
    this.audio.src = "../../../assets/"+this.question.path;
    //audio.src = "../../../assets/"+"TheWeekndBlindingLights.mp3";
    this.audio.load();
    this.audio.play();
  }
  
startCountdown(){
    var counter = 60;
    document.getElementById("imageShowed").style.visibility='hidden';
    this.message=""
    this.type=""
    this.answerDto.answer=""
    this.buttonEnable=true;
    this.answerDto.id=this.question.id;
    this.performance=performance.now();
    if(this.question.type=="MUSIC"){
      this.hello=this.question.path;
      this.playMusic=true;

    }
    else if(this.question.type="PICTURE"){
      this.playMusic=false;
      this.hello=this.question.path;
      document.getElementById("imageShowed").style.visibility='visible';


    }
    else{

      this.playMusic=false;

    }
  
    var interval = setInterval(() => {
      this.secondsLeft=( (counter < 10) ? "0" : "" ) + counter+" sekundi";
      this.q=this.question.text

      counter--;
  
      if(counter == 0 ){
        
        // The code here will run when
        // the timer has reached zero.
        
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
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({token: JSON.parse(
        localStorage.getItem('currentUser')).token}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent:QuestionDto) {
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
};

_disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    else{
        alert("stomp empty")
    }
    console.log("Disconnected");
}

// on error, schedule a reconnection attempt
errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
}

/**
* Send message to sever via web socket
* @param {*} message 
*/
_send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
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
