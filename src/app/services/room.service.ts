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
}
