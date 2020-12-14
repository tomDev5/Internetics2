import { OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-add-user-to-room',
  templateUrl: './add-user-to-room.component.html',
  styleUrls: ['./add-user-to-room.component.css']
})
export class AddUserToRoomComponent implements OnInit, OnChanges {

  @ViewChild('closebutton') closebutton:any;

  @Input() userList:User[] = [];

  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();

  selectedValue:User = {_id: '', name: ''};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    
  }

  onAddClick(){
    this.userAdded.emit(this.selectedValue)
    this.closebutton.nativeElement.click();
  }

}
