import { Component, Input, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Room } from '../../models/Room';

@Component({
  selector: 'app-create-new-room-modal',
  templateUrl: './create-new-room-modal.component.html',
  styleUrls: ['./create-new-room-modal.component.css']
})
export class CreateNewRoomModalComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;

  @Output() roomAdded: EventEmitter<string> = new EventEmitter<string>();

  @Input() roomList:Room[] = [];

  roomName:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  newRoomNameChange(e:any){
    this.roomName = e.target.value
  }

  onAddClick(){
    this.roomAdded.emit(this.roomName)
    this.closebutton.nativeElement.click();
  }

}
