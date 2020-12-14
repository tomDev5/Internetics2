import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from '../../models/Message'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private http:HttpClient) { }

  timestamps:number[] = [0,1,2,3,4,5]

  ngOnInit(): void {
    this.getGraphData();
  }

  getGraphData(){
    this.http.get<any>("/api/admins/postsOverTime").subscribe(
      data=>{
        /*for(let element of data){
          this.timestamps.push(element.upload_time)
        }*/
      },
      error=>{
        console.log(error)
      })
  }

}
