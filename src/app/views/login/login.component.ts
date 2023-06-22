import { Component } from '@angular/core';
import { LoginRequest } from 'src/app/DTOs/loginRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email!: string;
  public password!: string;

  constructor(private _loginService: LoginService) {  }


  public login() {
    let request = new LoginRequest(this.email, this.password);

    this._loginService.login(request).subscribe((res) => {
      localStorage.setItem('auth', JSON.stringify(res.token))
    })

  }
}
