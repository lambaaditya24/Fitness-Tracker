import { UserData } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from '../training/training/trainig.service';

@Injectable()
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth,private trainingService:TrainingService) {}
  authChange = new Subject<boolean>();
  isAuthenticated: boolean = false;
  private user: UserData;

  initAuthListner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(["/training"]);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(["/signup"]);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log("registered successfully");
      })
      .catch(error => {
        console.log("error registering");
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log("login success");
      })
      .catch(error => {
        console.log("login error");
      });
  }

  logout() {
    this.trainingService.cancelSubscription();
    this.afAuth.auth.signOut();
  }
  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
