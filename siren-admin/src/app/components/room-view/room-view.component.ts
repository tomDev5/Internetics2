import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../models/User'
import { Message} from '../../models/Message'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit, OnChanges {

  @Input() roomID:string = '';
  users:string[] = [];
  messages:Message[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  getRoomData(){
    if(this.roomID !== ''){
      this.http.get<any>("/api/admins/room?roomID="+this.roomID).subscribe(
        data=>{
          console.log(data)
          this.users = data.users;
          this.messages = data.sirens;
        },
        error=>{
          console.log(error)
        })
    }
  }

  stringifyTimestamp = (timestamp:number) => {
    const date = new Date(timestamp)
    const europe_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return date.toLocaleTimeString() + ', ' + europe_date
  }

  ngOnChanges(){
    this.getRoomData()
  }

  deleteMessage(messageID:string){
    this.http.delete<any>("/api/admins/message?roomID="+this.roomID+"&messageID="+messageID).subscribe(
      data=>{
        this.users = data.users;
        this.messages = data.sirens;
      },
      error=>{
        console.log(error)
      }
    )
  }

  deleteComment(messageID:string,commentID:string){
    this.http.delete<any>("/api/admins/comment?roomID="+this.roomID+"&messageID="+messageID+"&commentID="+commentID).subscribe(
      data=>{
        this.users = data.users;
        this.messages = data.sirens;
      },
      error=>{
        console.log(error)
      }
    )
  }

  removeUser(userID:string){

  }

  addUser(){
    
  }

  onCommentsBtnClick(messageID:string){
    let btn = document.getElementById('comments-'+messageID+'-btn')
    let commentSection = document.getElementById('comments-'+messageID)
    if(commentSection?.classList.contains('collapse')){
      commentSection.classList.remove('collapse')
      btn?.classList.remove('btn-outline-dark')
      btn?.classList.add('btn-dark')
    }else{
      commentSection?.classList.add('collapse')
      btn?.classList.remove('btn-dark')
      btn?.classList.add('btn-outline-dark')
    }
  }

}
