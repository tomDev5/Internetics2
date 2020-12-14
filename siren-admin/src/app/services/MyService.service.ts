import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private http:HttpClient, private router: Router) { }

  logout(){
    this.http.post<any>('/api/admins/logout', {}).subscribe(
        data=>{
          console.log(data)
          this.router.navigateByUrl('/login')
        }
      ,
        error=>{
          
        })
  }

  async login(username:string,password:string){
    await this.http.post<any>("/api/admins/login", {username: username,password: password}).subscribe(
      data=>{
        this.router.navigateByUrl('/rooms')
      },
      error=>{
        if(error.status === 200){
          this.router.navigateByUrl('/rooms')
        }
      })
  }
}
