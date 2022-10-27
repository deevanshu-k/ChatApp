import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public socket: Socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  join(username:string,room?:string,token?:string){
    let data = {
      user : username,
      room,
      token
    }
    this.socket.emit('join',data);
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  newUser(room:string='globalRoom') : Observable<any> {
    return new Observable(observe => {
      this.socket.on(`${room}-newuser`,(data) => {
        observe.next(data);
      })
    });
  }

  newMessage(room:string='globalRoom') : Observable<any> {
    return new Observable(observe => {
      this.socket.on(`${room}-newmessage`,(data) => {
        observe.next(data);
      })
    })
  }

  unauthorized(room:string) : Observable<any> {
    return new Observable(observe => {
      this.socket.on(`${room}-UNAUTHORISED`,(data) => {
        observe.next(data);
      })
    })
  }

  message(userName:string,msg : string,room?:string){
    this.socket.emit('message',{
      userName,
      message:msg,
      room
    })
  }

  leaveRoom(room:string,userName:string){
    this.socket.emit("leave",{
      room,
      user : userName
    })
  }
}
