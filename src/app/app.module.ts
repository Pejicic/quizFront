import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import {RecaptchaModule} from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CountdownComponent } from './countdown/countdown.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowScoreComponent } from './show-score/show-score.component';
import { PlayerHeaderComponent } from './player-header/player-header.component';
import { PlayerMainComponent } from './player-main/player-main.component';
import { GameComponent } from './game/game.component';
import { AuthGuardGuard } from './auth-guard.guard';



const appRoutes: Routes = [
  {
    path: "main",
    component: MainPageComponent,
    children: [

      { path: 'countdown', component: CountdownComponent},
      
    ] 

  },

  {path: "login", component: LoginPageComponent },
  {path: "gameTime", component: GameComponent,canActivate: [AuthGuardGuard] },
  {path:"userManage", component:UserManagementComponent,canActivate: [AuthGuardGuard]},
  {path:"addQuestion", component:AddQuestionComponent,canActivate: [AuthGuardGuard]},
  {path:"manageQuestion", component:ManageQuestionComponent,canActivate: [AuthGuardGuard]},
  {path:"editData", component:EditProfileComponent,canActivate: [AuthGuardGuard]},
  {path:"showScore", component:ShowScoreComponent,canActivate: [AuthGuardGuard]},
  {path:"playerMain",component:PlayerMainComponent,canActivate: [AuthGuardGuard]},

  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }

];




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    CountdownComponent,
    NotFoundPageComponent,
    UserManagementComponent,
    AdminHeaderComponent,
    AddQuestionComponent,
    ManageQuestionComponent,
    EditProfileComponent,
    ShowScoreComponent,
    PlayerHeaderComponent,
    PlayerMainComponent,
    GameComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,    
    HttpClientModule,                        
    ReactiveFormsModule , 
    RecaptchaModule.forRoot(),                     
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
