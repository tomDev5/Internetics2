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

  timestamps:number[] = []

  ngOnInit(): void {
    this.getGraphData();
  }

  getGraphData(){
    this.http.get<any>("/api/admins/postsOverTime").subscribe(
      data=>{
        for(let element of data){
          this.timestamps.push(element.upload_time)
        }
        this.timestamps.sort(function(a, b) {
          return a - b;
        });
      },
      error=>{
        console.log(error)
      })
  }

}
