import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-siren',
  templateUrl: './search-siren.component.html',
  styleUrls: ['./search-siren.component.css']
})
export class SearchSirenComponent implements OnInit {
  sirens: Array<any> = []

  constructor(private http:HttpClient) { }

  stringifyTimestamp = (timestamp:number) => {
    const date = new Date(timestamp)
    const europe_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return date.toLocaleTimeString() + ', ' + europe_date
  }

  deleteMessage(messageID:string){
    const roomID = this.sirens.filter(siren => siren._id === messageID)[0].room
    this.http.delete<any>("/api/admins/message?roomID="+roomID+"&messageID="+messageID).subscribe();
    
    (<HTMLInputElement>document.getElementById("filter-btn")).click()
  }

  deleteComment(messageID:string,commentID:string){
    const roomID = this.sirens.filter(siren => siren._id === messageID)[0].room
    this.http.delete<any>("/api/admins/comment?roomID="+roomID+"&messageID="+messageID+"&commentID="+commentID).subscribe();
  
    (<HTMLInputElement>document.getElementById("filter-btn")).click()
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

  filter(username: string, roomname: string, content: string) {
    this.http.get<any>("/api/admins/messages").subscribe(
      data => this.sirens = data,
      error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

}
