import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public idConnection!: string;
  public show: boolean = false;
  message!: string;


  public fromUser: string = localStorage.getItem('idConnection') || "";;
  public toUser!: string;
  public username!: string;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.createChatConnection();
    this.idConnection = localStorage.getItem('idConnection') || ""
  }

  public typeMessage(id: string) {
    this.username = this.chatService.usersOnline.find(x => x.id === this.toUser)?.username || "";
    this.toUser = id;
    this.show = true;
    this.chatService.createPrivateChat(this.fromUser, this.message, this.toUser);
  }

  sendMessage() {
    this.chatService.sendMessage(this.fromUser, this.message, this.toUser)
  }
}
