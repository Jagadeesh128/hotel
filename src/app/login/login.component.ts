import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route : Router, private loginService: LoginService) { }

  email : string = '';
  password : string = '';

  ngOnInit(): void {
  }

  login(){
    if(this.loginService.login(this.email, this.password)){
        
      this.route.navigate(['/rooms'])

    }
    else{
      alert(" Invalid Credentials")
    }

  }

}
