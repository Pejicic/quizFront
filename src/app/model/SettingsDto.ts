import { QuestionService } from '../services/question/question.service'



export class SettingsDto{
   
    hoursBegin: number   //pocetak prijave za kviz
    hoursEnd:number        //kraj prijave za kviz i pocetak real time kviza
    minutesBegin:number   //pocetak prijave za kviz
    minutesEnd:number     //kraj prijave za kviz i pocetak real time kviza
    quizFinishedHours:number   //kraj kviza
    quizFinishedMinutes:number  //kraj kviza
    dayOfQuiz:number  // pocinje od nedjelje sa 0   

}