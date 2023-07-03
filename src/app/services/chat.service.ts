import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable } from "@angular/core";
import { Account } from '../models/account';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }

  public hubConnection?: HubConnection;
  public usersOnline!: Account[];
  public messages: Message[] = [];


  createChatConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5141/hub").build();

    this.hubConnection.start().catch((err) => console.error(err));

    this.hubConnection.on('UsersOnline', (res) => {
      this.usersOnline = res
    })

    this.hubConnection.on("NewPrivateMessage", (res) => {
      this.messages.push(res)
      console.log(res)
    })
  }

  sendMessage(fromUser: string, message: string, toUser: string) {
    this.hubConnection?.invoke("SendToUser", fromUser, message, toUser)
      .then(() => {
        console.log("MENSAGEM ENVIADA")
      })
      .catch((err) => console.error(err));
  }

  createPrivateChat(fromUser: string, message: string, toUser: string) {
    this.hubConnection?.invoke("CreatePrivateChat", fromUser, message, toUser)
    .then(() => console.log("Abrindo chat privado"))
    .catch((err) => console.error(err));
  }

}

