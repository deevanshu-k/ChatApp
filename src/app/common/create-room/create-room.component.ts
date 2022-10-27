import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  roomForm = this.fb.group({
    room: ['',Validators.required],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private matRef:MatDialogRef<CreateRoomComponent>,
    private fb:FormBuilder,
    private roomServices : RoomService
    ) { }

  ngOnInit(): void {
  }

  Close(){
    this.matRef.close();
  }

  roomformSubmit(){
    console.log(this.roomForm);
    this.roomServices.createRoom(String(this.roomForm.value.room),String(this.roomForm.value.password)).subscribe({
      next: (d:any) => {
        this.matRef.close({
          room : d.data.room,
          id : d.data.id
        });
      },
      error: (e) => {
        this.matRef.close();
        alert('Not able to create room!');
      },
      complete: () => {}
    })
  }

}
