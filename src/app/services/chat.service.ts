
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import { Socket } from 'ngx-socket-io';
 
@Injectable()
export class ChatService {
 
    constructor(private socket: Socket) { }
 GetloginUsers(){     
     return this.socket
            .fromEvent<any>("usernames")
            .map(data => data);
 }
   getMessage() {
        return this.socket
            .fromEvent<any>("new message")
            .map(data => data);
    }

    sendMessage(msg: any) {
        this.socket
            .emit("send message", msg);
    }
         CreateUser(user: any) {
                this.socket
                    .emit("new user", user);
            }
}