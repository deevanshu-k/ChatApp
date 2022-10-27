import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  userName: string;
  messages: { userName: string, message: string }[] = [];

  msgForm = this.fb.group({
    message: ['', Validators.required]
  })

  constructor(private socketService: SocketioService,
    private fb: FormBuilder) {
    this.userName = String(localStorage.getItem('userName'));
  }

  ngOnInit(): void {
    this.socketService.newUser().subscribe((d) => {
      console.log('New user => ', d);
      this.addMsg('NEWUSER', `${d.user} Joined the room`)
    });
    this.socketService.newMessage().subscribe((d) => {
      if (this.messages.length > 13) {
        this.messages.splice(0, 1);
      }
      this.messages.push(d);
      console.log(this.messages);

    })
  }

  msgSubmit(){
    let message = this.msgForm.get('message')?.value;
    console.log(message);
    this.socketService.message(this.userName,String(message));
    this.addMsg(this.userName,String(message));
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
