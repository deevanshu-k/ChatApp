import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component({
  selector: 'app-room-bar',
  templateUrl: './room-bar.component.html',
  styleUrls: ['./room-bar.component.css']
})
export class RoomBarComponent implements OnInit {
  rooms: { id: string, name: string }[] = [{ 'id': '000000', name: 'globalChat' }];

  constructor(private roomServices: RoomService, private matDilog: MatDialog) { }

  ngOnInit(): void {
    this.roomServices.getAllRooms().subscribe({
      next: (d: any) => {
        d.data.forEach((element: any) => {
          this.rooms.push(element)
        });
      },
      error: (e) => { },
      complete: () => { }
    })
  }

  openDilog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.matDilog.open(CreateRoomComponent, dialogConfig);
  }

}
