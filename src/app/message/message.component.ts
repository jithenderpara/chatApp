import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [ChatService]
})
export class MessageComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  public persons: any = [
    {
      "name": "Sacha Griffin", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_1.jpg", "status": "online",
      "statusmsg": "Super deep status message blah blah", "unreadmessages": "11", "lastlogin": ""
    },
    {
      "name": "Debby Jones", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_2.jpeg", "status": "away",
      "statusmsg": "New day, fresh start, fresh eadaf", "unreadmessages": "", "lastlogin": "Just now"
    },
    {
      "name": "Sarah White", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_3.jpg", "status": "busy",
      "statusmsg": "Life becomes more peaceful when", "unreadmessages": "", "lastlogin": "2 min"
    },
    {
      "name": "Johhny McGrump", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_4.jpeg", "status": "",
      "statusmsg": "On vacation for two weeks", "unreadmessages": "", "lastlogin": "Tuesday"
    },
    {
      "name": "Tommy Tom", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_5.jpg", "status": "",
      "statusmsg": "On vacation for two weeks", "unreadmessages": "", "lastlogin": "Tuesday"
    },
    {
      "name": "James King", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_6.jpg", "status": "",
      "statusmsg": "Super deep status message afad", "unreadmessages": "", "lastlogin": "Friday"
    },
    {
      "name": "Natsumi Miyu", "pic": "http://vzkiss.com/demo/chatbox/images/avatar/avatar_7.jpg", "status": "online",
      "statusmsg": "Super deep status message afad", "unreadmessages": "", "lastlogin": "Wednesday"
    }
  ];

  msg: string;
  _messages: any = [];
  public users:any=[];
  public showlogin: boolean = true;
  //$chat.append("<strong>"+data.nickname+"</strong>:"+data.msg + '<br>')
  ngOnInit() {
    this.getusermessage()
    this.getAllUsers()
  }
  getAllUsers(){    
 this.chatService
      .GetloginUsers()
      .subscribe(
      data => {
        this.users=data
      })
  }
  signup(name) {
    this.chatService.CreateUser(name);
    this.showlogin = false;
  }
  sendMsg(msg) {
    let sendObj = { name: "All", message: msg }
    this.chatService.sendMessage(sendObj);
  }
  getusermessage() {
    this.chatService
      .getMessage()
      .subscribe(
      data => {
        this._messages.push(data)
      })

  }
  sendMsgToUser(msg,username) {
    let sendObj = { name: username, message: msg }
     this.chatService.sendMessage(sendObj);

  }
}
