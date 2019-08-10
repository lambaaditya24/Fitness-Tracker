import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit ,OnDestroy {
  showprogressbar :boolean = false;
  maxDate;
  authChanged:Subscription;
  constructor(private authService:AuthService,private uiservice:UIService) { }

  ngOnInit() {
    this.authChanged = this.uiservice.authChanged.subscribe(value=>{
      this.showprogressbar = value;
    })
    this.maxDate =new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18); 
  }

  onSubmit(form:NgForm){
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    });
  }
  ngOnDestroy(){
    this.authChanged.unsubscribe();
  }
}
