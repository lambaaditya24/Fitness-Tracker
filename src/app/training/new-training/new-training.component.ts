import { Component, OnInit, OnDestroy } from "@angular/core";
import { Excercise } from "../training/excercise.model";
import { TrainingService } from "../training/trainig.service";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { UIService } from 'src/app/auth/ui.service';

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  trainingfetched:boolean=false;
  Training: Excercise[];
  excerciseChange:Subscription;
  trainingFetch:Subscription;
  constructor(
    private trainingService: TrainingService,private uiservice:UIService
  ) {}

  ngOnInit() {
    this.trainingFetch = this.uiservice.trainingfetched.subscribe(value=>{
      this.trainingfetched = value
    })

   this.excerciseChange = this.trainingService.excerciseChanged.subscribe(excercise=>{
     this.Training = excercise
     this.uiservice.trainingfetched.next(false);
   })
   this.trainingService.fetchavailableExcercise()
      
  }

  startExcercise(f: NgForm) {
    this.trainingService.startExcercise(f.value.excercise);
  }

  ngOnDestroy(){
    this.excerciseChange.unsubscribe();
    this.trainingFetch.unsubscribe();
  }
}

