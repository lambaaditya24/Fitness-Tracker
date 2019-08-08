import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  authnav:Subscription;
  isAuth = false;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authnav = this.authService.authChange.subscribe(authStatus=>{
      this.isAuth = authStatus;
    })
  }
  toClose(){
    this.closeSidenav.emit();
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authnav.unsubscribe();
  }
}
