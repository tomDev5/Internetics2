import { Component, OnInit } from '@angular/core';
import { MyService } from 'src/app/services/MyService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = ''
  password:string = ''

  constructor(private myService:MyService) { }

  ngOnInit(): void {
  }

  usernameChange(e:any){
    this.username = e.target.value
  }

  passwordChange(e:any){
    this.password = e.target.value
  }

  login(){
    this.myService.login(this.username,this.password)
  }

}
