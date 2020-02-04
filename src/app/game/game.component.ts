import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoginDto } from '../model/LoginDto';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router } from '@angular/router';
import { QuestionDto } from '../model/QuestionDto';
import { AnswerDto } from '../model/AnswerDto';

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
  playMusic:boolean=false;
  buttonEnable:boolean=true; 
  hello:string="milky-way-2695569_1920.jpg";
  imagePath:string="('../../assets/backgrounds/"+this.hello;




  constructor(private router:Router) { }
  
  ngOnInit() {
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
    let audio = new Audio();
    audio.src = "../../../assets/"+this.question.path;
    //audio.src = "../../../assets/"+"TheWeekndBlindingLights.mp3";
    audio.load();
    audio.play();
  }
  
startCountdown(){
    var counter = 60;
    this.q=this.question.text
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
      document.getElementById("seconds").innerHTML = ( (counter < 10) ? "0" : "" ) + counter+" seconds remain";

      counter--;
  
      if(counter < 0 ){
        
        // The code here will run when
        // the timer has reached zero.
        
        clearInterval(interval);
        this.startCountdown()
      };
    }, 1000);
  };
  

  odgovori(){
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

    if(this.question.text==null || this.question.text==this.q ){

      this.router.navigate(["showScore"])

    }
    else{
      this.startCountdown()

    }

}


 

}
