import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { LoginRequest } from 'src/app/DTOs/loginRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email!: string;
  public password!: string;

  private _hubConnection!: HubConnection;

  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5141/hub').build()
    this._hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  constructor(private _loginService: LoginService) {  }


  public login() {
    let request = new LoginRequest(this.email, this.password);

    this._loginService.login(request).subscribe((res) => {
      localStorage.setItem('auth', JSON.stringify(res.token))

      this._hubConnection.invoke('GetUser', this.email)
      .then(() => { })
      .catch((err) => console.log('Error '+ err))
    })

  }
}
