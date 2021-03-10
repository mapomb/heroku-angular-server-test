import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socket: any;
  readonly server: string = 'ws://localhost:3000';

  constructor() {
    this.socket = io(this.server);
  }

  listen(eventName: string): any{
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: unknown) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): any {
    this.socket.emit(eventName, data);
  }
}
