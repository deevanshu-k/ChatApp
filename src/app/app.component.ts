import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat App';
  userName:string = '';
  messages: {userName:string , message: string}[] = [];

  nameForm = this.fb.group({
    name: "",
  });

  msgForm = this.fb.group({
    message: ""
  })

  constructor(private socketService: SocketioService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.newUser().subscribe((d) => {
      console.log('New user => ',d);
    });
    this.socketService.newMessage().subscribe((d) => {
      if(this.messages.length > 13){
        this.messages.splice(0,1);
      }
      this.messages.push(d);
      console.log(this.messages);
      
    })
  }

  nameSubmit() {
    let name = this.nameForm.get('name')?.value;
    console.log(name);
    this.socketService.join(String(name));
    this.userName = String(name);
  }

  msgSubmit(){
    let message = this.msgForm.get('message')?.value;
    console.log(message);
    this.socketService.message(this.userName,String(message));
    if(this.messages.length > 13){
      this.messages.splice(0,1);
    }
    this.messages.push({
      userName : this.userName,
      message: String(message)
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
