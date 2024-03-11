import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route : Router) { }

  email : string = '';
  password : string = '';

  ngOnInit(): void {
  }

  login(){
    if(this.email === "admin@gmail.com" && this.password === "admin"){
      alert("Login Successfully");  
      this.route.navigate(['/rooms','add'])

    }
    else{
      alert(" Invalid Credentials")
    }

  }

}
