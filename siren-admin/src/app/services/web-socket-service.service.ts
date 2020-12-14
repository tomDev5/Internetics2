import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as socket from 'socket.io-client';

export class WebSocketService implements OnDestroy {
  private socket: socket.Socket
  private uri: string = "ws://" + location.host

  constructor() {
    this.socket = socket.io(this.uri)
  }
  ngOnDestroy(): void {
    console.log('service destroyed')
    this.socket.close()
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
