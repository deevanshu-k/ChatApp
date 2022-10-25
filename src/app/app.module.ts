import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { SocketioService } from './socketio.service';
import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomBarComponent } from './common/room-bar/room-bar.component';
import { SpecificRoomComponent } from './specific-room/specific-room.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomBarComponent,
    SpecificRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatCardModule,
    MatButtonModule,

    AppRoutingModule
    
    
  ],
  providers: [
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
