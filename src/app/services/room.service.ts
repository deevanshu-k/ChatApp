import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient) {
   }

  getAllRooms(){
    return this.http.get(`${environment.SOCKET_ENDPOINT}/v1/api/rooms`);
  }

  getAccess(room:string,password:string,userName:string){
    return this.http.post(`${environment.SOCKET_ENDPOINT}/v1/api/getRoomAccess`,{
      room,
      password,
      userName
    })
  }

  createRoom(room:string,password:string){
    return this.http.post(`${environment.SOCKET_ENDPOINT}/v1/api/createRoom`,{
      room,
      password
    })
  }
}
