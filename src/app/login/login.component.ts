import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
   providers : [ChatService]
})
export class LoginComponent implements OnInit {

  constructor(private chatService : ChatService) { }

  ngOnInit() {
    
  }
  signup(name){   
     this.chatService.CreateUser(name);
  }

}
