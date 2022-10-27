import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { SocketioService } from './socketio.service';
import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomBarComponent } from './common/room-bar/room-bar.component';
import { SpecificRoomComponent } from './specific-room/specific-room.component';
import { CreateRoomComponent } from './common/create-room/create-room.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomBarComponent,
    SpecificRoomComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

    AppRoutingModule
    
    
  ],
  providers: [
    SocketioService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateRoomComponent]
})
export class AppModule { }
