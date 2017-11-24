import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:155/', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
   SocketIoModule.forRoot(config),
    RouterModule.forRoot([
      { path:"login",component:LoginComponent},
      { path:"message",component:MessageComponent},
       { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ]) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
