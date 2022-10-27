import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomService } from '../services/room.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-specific-room',
  templateUrl: './specific-room.component.html',
  styleUrls: ['./specific-room.component.css']
})
export class SpecificRoomComponent implements OnInit {
  token: string;
  userName: string;
  room: string;
  messages: { userName: string, message: string }[] = [];

  msgForm = this.fb.group({
    message: ['', Validators.required]
  });
  unauSub : Subscription;
  newuserSub : Subscription;
  newmsgSub : Subscription;

  passwordForm = this.fb.group({
    password: ['', Validators.required]
  });
  passError: string;
  joined: boolean = false;

  constructor(
    private fb: FormBuilder,
    private socketService: SocketioService,
    private route: ActivatedRoute,
    private roomServices: RoomService
  ) {
    this.userName = String(localStorage.getItem('userName'));
    console.log(this.userName);
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((d: any) => {
      if (!d.room) {
        alert('Something went wrong!');
      }
      console.log(d.room);
      if(this.room){
        this.socketService.leaveRoom(this.room,this.userName);
        this.unauSub.unsubscribe();
        this.newmsgSub.unsubscribe();
        this.newuserSub.unsubscribe();
      }
      this.room = d.room;
      this.joined = false;
      this.messages = [];
      this.unauSub = this.socketService.unauthorized(this.room).subscribe((d) => {
        this.joined = false;
        alert('Unauthorized Access!');
      });
      this.newuserSub = this.socketService.newUser(this.room).subscribe((d) => {
        console.log('New user => ', d);
        this.addMsg('NEWUSER', `${d.user} Joined the room`)
      });
      this.newmsgSub = this.socketService.newMessage(this.room).subscribe((d) => {
        if (this.messages.length > 13) {
          this.messages.splice(0, 1);
        }
        this.messages.push(d);
      });
    });
    

  }

  passwordSubmit() {
    let pwd = this.passwordForm.get('password')?.value;
    this.roomServices.getAccess(this.room, String(pwd), this.userName).subscribe({
      next: (d: any) => {
        this.token = d.token;
        this.joined = true;
        this.socketService.join(this.userName, this.room, this.token);
      },
      error: (e) => {
        this.passError = e.error.error.message;
        this.passwordForm.get('password')?.reset();
        setInterval(() => {
          this.passError = ''
        }, 2000);
      },
      complete: () => { }
    })
  }

  msgSubmit() {
    let message = this.msgForm.get('message')?.value;
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

  ngOnDestroy(){
  }

}
