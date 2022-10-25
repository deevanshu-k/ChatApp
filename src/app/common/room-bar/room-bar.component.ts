import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-bar',
  templateUrl: './room-bar.component.html',
  styleUrls: ['./room-bar.component.css']
})
export class RoomBarComponent implements OnInit {
  rooms: {id:string,name:string}[] = [{'id':'000000',name:'globalChat'}];

  constructor(private roomServices : RoomService) { }

  ngOnInit(): void {
    this.roomServices.getAllRooms().subscribe({
      next: (d:any) => {
        d.data.forEach((element:any) => {
          this.rooms.push(element)
        });
      },
      error: (e) => {},
      complete : () => {}
    })
  }

}
