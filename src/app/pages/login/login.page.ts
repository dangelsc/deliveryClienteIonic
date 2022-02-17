import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string='';
  password: string='';
  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
  }
  login(){
    this.auth.login(this.email,this.password);
  }

}
