import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat Room';
  userName:string = '';

  nameForm = this.fb.group({
    name: "",
  });

  constructor(private socketService: SocketioService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  nameSubmit() {
    let name = this.nameForm.get('name')?.value;
    console.log(name);
    this.socketService.join(String(name));
    localStorage.setItem('userName',String(name));
    this.userName = String(name);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
