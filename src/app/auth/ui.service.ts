import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UIService{
    constructor(private snackbar:MatSnackBar){}
    authChanged = new Subject<boolean>();
    trainingfetched = new Subject<boolean>();

openSnackbar(message:string,action:string,duration:number){
    this.snackbar.open(message,action,{
        duration:duration
    })
}
}