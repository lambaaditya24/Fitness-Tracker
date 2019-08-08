import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {MatDialog} from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training/trainig.service';
import { Excercise } from '../training/excercise.model';
@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  @Output() ExitTraining = new EventEmitter();
  progress = 0;
  timer: number;
  currentExcercise:Excercise;
  constructor(private dialog:MatDialog,private trainingService:TrainingService) {}

  ngOnInit() {
 this.currentExcercise = this.trainingService.getExcercise();
 this.startorResumeTimer();
  }
  startorResumeTimer(){
    const step = (this.currentExcercise.duration/100)*1000;
    console.log(step);
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.trainingService.completeExcercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{
      data:{
        progress:this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.trainingService.cancelExcercise(this.progress);
      }else{
        this.startorResumeTimer();
      }
    })
  }
}
