import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/Room'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedRoomID:string = '';
  rooms:Room[] = []

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.getRooms()
  }

  onTabClick(id:string): void{
    document.getElementById('room-'+this.selectedRoomID)?.classList.remove('active')
    this.selectedRoomID = id
    let tab = document.getElementById('room-'+id)
    tab?.classList.add('active')
  }

  getRooms = () => {
    this.http.get<any>("/api/admins/rooms").subscribe(
      data=>{
        console.log(data)
        this.rooms = data
        this.onTabClick(data[0]._id)
      },
      error=>{
        console.log(error)
      })
  }
}
