import { UserData } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from "../training/training/trainig.service";
import { UIService } from "./ui.service";

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    public uiservice: UIService
  ) {}
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
    this.uiservice.authChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiservice.openSnackbar("User created Successfully", null, 3000);
        this.uiservice.authChanged.next(false);
      })
      .catch(error => {
        this.uiservice.openSnackbar(error.message, null, 3000);
        this.uiservice.authChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this.uiservice.authChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiservice.openSnackbar(
          "Welcome to Ng Fitness Tracker",
          null,
          3000
        );
        this.uiservice.authChanged.next(false);
      })
      .catch(error => {
        this.uiservice.openSnackbar(error.message, null, 3000);
        this.uiservice.authChanged.next(false);
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
