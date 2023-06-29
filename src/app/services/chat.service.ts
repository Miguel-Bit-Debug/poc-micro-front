import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable } from "@angular/core";
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }

  public hubConnection?: HubConnection;

  createChatConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5141/hub").build();

    this.hubConnection.start().catch((err) => console.error(err));
  }
}

