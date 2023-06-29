import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  public fromUser: string = localStorage.getItem('idConnection') || "";;
  public toUser: string = this.route.snapshot.params['toUser'];;


  private hubConnection!: HubConnection;


  messages: { user: string, text: string }[] = [];
  message!: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.fromUser);
    console.log(this.toUser);
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5141/hub')
      .build();

    this.hubConnection.start().then(() => {
      this.ReceiveMessage();
    }).catch((err) => {
      console.log(err)
    });


  }

  public sendMessage(): void {
    this.hubConnection.invoke('SendToUser', this.fromUser, this.message, this.toUser)
    .then(() => {
      this.message = ''
    })
    .catch(error => console.error(error));
  }

  public ReceiveMessage() {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Mensagem recebida:', message);
    });
  }
}
