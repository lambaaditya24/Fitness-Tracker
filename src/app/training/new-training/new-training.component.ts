import { Component, OnInit, OnDestroy } from "@angular/core";
import { Excercise } from "../training/excercise.model";
import { TrainingService } from "../training/trainig.service";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  Training: Excercise[];
  excerciseChange:Subscription
  constructor(
    private trainingService: TrainingService,
  ) {}

  ngOnInit() {

   this.excerciseChange = this.trainingService.excerciseChanged.subscribe(excercise=>{
     this.Training = excercise
   })
   this.trainingService.fetchavailableExcercise()
      
  }

  startExcercise(f: NgForm) {
    this.trainingService.startExcercise(f.value.excercise);
  }

  ngOnDestroy(){
    this.excerciseChange.unsubscribe()
  }
}

