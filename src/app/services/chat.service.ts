
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import { Socket } from 'ngx-socket-io';
 
@Injectable()
export class ChatService {
 
    constructor(private socket: Socket) { }
 
   getMessage() {
        return this.socket
            .fromEvent<any>("msg")
            .map(data => data.msg);
    }

    sendMessage(msg: string) {
        this.socket
            .emit("msg", msg);
    }
}