import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

export class User {
  email!: string;
  id!: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _hubConnection!: HubConnection;

  public users : User[] = new Array<User>();

  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5141/hub').build()
    this._hubConnection.start()
    .then(() => {
      this._hubConnection.invoke('ShowUsers')
      .then((res) => {
        this.users = res;
        console.log(res)
      })
      .catch((err) => console.log('Error '+ err))
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
}
