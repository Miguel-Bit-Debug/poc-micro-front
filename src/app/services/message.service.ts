import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _hubConnection!: HubConnection;


  constructor() {
  }

  public connect() {




  }

}
