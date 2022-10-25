import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { SpecificRoomComponent } from './specific-room/specific-room.component';

const routes: Routes = [
  // { path: '', redirectTo: '/room/globalChat' },
  { path: 'room/globalChat', component: RoomComponent },
  { path: 'room/:room', component: SpecificRoomComponent },
  { path: '**', redirectTo: '/room/globalChat' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }