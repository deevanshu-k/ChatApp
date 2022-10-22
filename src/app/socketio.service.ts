import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public socket: Socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  join(username:string){
    let data = {
      user : username
    }
    this.socket.emit('join',data);
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  newUser() : Observable<any> {
    return new Observable(observe => {
      this.socket.on('newuser',(data) => {
        observe.next(data);
      })
    });
  }

  newMessage() : Observable<any> {
    return new Observable(observe => {
      this.socket.on('newmessage',(data) => {
        observe.next(data);
      })
    })
  }

  message(userName:string,msg : string){
    this.socket.emit('message',{
      userName,
      message:msg
    })
  }
}
