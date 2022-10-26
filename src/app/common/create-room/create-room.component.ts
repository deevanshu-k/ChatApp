import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
  }

  Close(){
    this.matRef.close();
  }

  roomformSubmit(){
    console.log(this.roomForm);
  }

}
