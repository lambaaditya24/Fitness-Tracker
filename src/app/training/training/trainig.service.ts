import { Excercise } from "./excercise.model";
import { Subject, Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  constructor(private db:AngularFirestore){}

  currentExcercise = new Subject<Excercise>();//sending subject to post training for showing post excercises
  pastExcercises = new Subject<Excercise[]>();

  private runningExcercise: Excercise;//excercise that is selected by user to show in current training
  excerciseChanged = new Subject<Excercise[]>();//sending subject to new training for showing available excercises
  private availableExcercise: Excercise[] = [];//Array of excercises that we get from database from which user can choose
  private ftSubs:Subscription[]=[];
  
  fetchpastExcercises(){
    this.ftSubs.push(this.db.collection('finishedExcercise').valueChanges().subscribe((excercise:Excercise[])=>{
        this.pastExcercises.next(excercise);
      }
    ))
  }

  fetchavailableExcercise(){
    this.ftSubs.push(this.db
    .collection("availableExcercises")
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()             
          }as Excercise;
        });
      })
    ).subscribe((excercise:Excercise[])=>{
      this.availableExcercise = excercise;
      this.excerciseChanged.next([...this.availableExcercise]);
    }))
  }

  completeExcercise() {
    this.addData({
      ...this.runningExcercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExcercise = null;
    this.currentExcercise.next(null);
  }

  cancelExcercise(progress: number) {
    this.addData({
      ...this.runningExcercise,
      date: new Date(),
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      state: "cancelled"
    });
    this.runningExcercise = null;
    this.currentExcercise.next(null);
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercise.find(
      ex => ex.id === selectedId
    );
    this.currentExcercise.next({ ...this.runningExcercise });
  }

  getExcercise() {
    return { ...this.runningExcercise };
  }

  private addData(excercise:Excercise){
    this.db.collection('finishedExcercise').add(excercise);
  }

  cancelSubscription(){
    this.ftSubs.forEach(sub=>sub.unsubscribe());
  }
}
