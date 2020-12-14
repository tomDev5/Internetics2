import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Observable } from 'rxjs';
import * as socket from 'socket.io-client';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  events: Array<Event> = []
  private socket: socket.Socket = socket.io("ws://" + location.host)

  constructor() {}

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  ngOnInit(): void {
    this.listen('siren').subscribe((data: any) => {
      const date = new Date()
      const europe_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
      const datetimeString = date.toLocaleTimeString() + ', ' + europe_date

      this.events.unshift(new Event('New Siren Sent', datetimeString, data.user, data.room, data.text))
    })
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data)
      })
    })
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }
}
