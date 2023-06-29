import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Account } from 'src/app/models/account';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _hubConnection!: HubConnection;
  public usersOnline!: Account[];
  public idConnection!: string;

  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5141/hub').build()
    this._hubConnection.start()
      .then(() => {

        this.idConnection = localStorage.getItem('idConnection') || ""
        this._hubConnection.invoke('ShowUsers')
          .then((res: Account[]) => {
            this.usersOnline = res;
          })
          .catch((err) => console.log('Error ' + err))
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
}
