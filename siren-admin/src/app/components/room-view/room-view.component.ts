import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../models/User'
import { Message} from '../../models/Message'
import {DomSanitizer} from "@angular/platform-browser"

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit, OnChanges {

  @Input() roomID:string = '';
  users:User[] = [];
  messages:Message[] = [];

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.users = [
      {_id: 'tomlubin', name: 'Tom'},
      {_id: 'omerlubin', name: 'Omer'},
      {_id: 'tomlubin1', name: 'Tom1'},
      {_id: 'omerlubin1', name: 'Omer1'},
      {_id: 'tomlubin2', name: 'Tom2'},
      {_id: 'omerlubin2', name: 'Omer2'},
      {_id: 'tomlubin3', name: 'Tom3'},
      {_id: 'omerlubin3', name: 'Omer3'},
    ]

    this.messages = [
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now(), comments: [{_id: '245123tghfuierdfnghor', user: 'omerlubin', text: 'COMMENT!', upload_time: 256442323}]},
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now()+5000, comments: []},
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now()+10000, comments: []},
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now()+15000, comments: []},
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now()+15000, comments: []},
      {_id: '123', user: 'tomlubin', text:'hi',likes: 16,upload_time: Date.now()+15000, comments: []},

    ]
  }

  ngOnChanges(){
    console.log("change: "+this.roomID)
  }

  stringifyTimestamp = (timestamp:number) => {
    const date = new Date(timestamp)
    const europe_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return date.toLocaleTimeString() + ', ' + europe_date
  }

  removeAll(){

  }

  onLike(messageID:string){

  }

  onCommentsBtnClick(messageID:string){
    let btn = document.getElementById('comments-'+messageID+'-btn')
    let commentSection = document.getElementById('comments- '+messageID)
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
