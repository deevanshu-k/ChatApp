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
  userName:string = 'sda';
  nameForm = this.fb.group({
    name: "",
  });

  constructor(private socketService: SocketioService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.newUser().subscribe((d) => {
      console.log('New user => ',d);
    })
  }

  nameSubmit() {
    let name = this.nameForm.get('name')?.value;
    console.log(name);
    this.socketService.join(String(name));
    this.userName = String(name);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
