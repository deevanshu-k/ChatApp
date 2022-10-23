import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    message: ['',Validators.required]
  })

  constructor(private socketService: SocketioService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.newUser().subscribe((d) => {
      console.log('New user => ',d);
      this.addMsg('NEWUSER',`${d.user} Joined the room`)
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
    this.addMsg(this.userName,String(message));
    this.msgForm.reset();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
  
  addMsg(userName:string,message:string){
    if(this.messages.length > 13){
      this.messages.splice(0,1);
    }
    this.messages.push({
      userName,
      message
    });
  }
}
