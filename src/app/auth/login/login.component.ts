import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {
  showprogressbar:boolean=false;
  authChanged:Subscription;
  constructor(private authService:AuthService,private uiservice:UIService) { }

  ngOnInit() {
  this.authChanged =  this.uiservice.authChanged.subscribe(value=>{
    this.showprogressbar = value;
  })
  }

  onLogin(form:NgForm){
    this.authService.login({
      email:form.value.username,
      password:form.value.password
    })
  }

  ngOnDestroy(){
    this.authChanged.unsubscribe()
  }
}
