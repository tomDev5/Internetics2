import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RoomViewComponent } from './components/room-view/room-view.component';
import { LoginComponent } from './components/login/login.component';
import { DataComponent } from './components/data/data.component';
import { FeedComponent } from './components/feed/feed.component';
import { AddUserToRoomComponent } from './components/add-user-to-room/add-user-to-room.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    TopBarComponent,
    RoomViewComponent,
    LoginComponent,
    DataComponent,
    FeedComponent,
    AddUserToRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
