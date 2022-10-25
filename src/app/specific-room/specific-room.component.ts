import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-specific-room',
  templateUrl: './specific-room.component.html',
  styleUrls: ['./specific-room.component.css']
})
export class SpecificRoomComponent implements OnInit {
  userName: string;
  room: string;
  messages: { userName: string, message: string }[] = [];

  msgForm = this.fb.group({
    message: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private socketService: SocketioService,
    private route: ActivatedRoute
  ) {
    this.userName = String(localStorage.getItem('userName'));
  }

  ngOnInit(): void {
    this.route.params.subscribe((d: any) => {
      if (!d.room) {
        alert('Something went wrong!');
      }
      this.room = d.room;
      console.log('new room =>',d.room);
    });
    this.socketService.join(this.userName,this.room);
    this.socketService.newUser(this.room).subscribe((d) => {
      console.log('New user => ', d);
      this.addMsg('NEWUSER', `${d.user} Joined the room`)
    });
    this.socketService.newMessage(this.room).subscribe((d) => {
      if (this.messages.length > 13) {
        this.messages.splice(0, 1);
      }
      this.messages.push(d);
      console.log(this.messages);

    })

  }

  msgSubmit() {
    let message = this.msgForm.get('message')?.value;
    console.log(message);
    this.socketService.message(this.userName, String(message), this.room);
    this.addMsg(this.userName, String(message));
    this.msgForm.reset();
  }

  addMsg(userName: string, message: string) {
    if (this.messages.length > 13) {
      this.messages.splice(0, 1);
    }
    this.messages.push({
      userName,
      message
    });
  }

  

}
