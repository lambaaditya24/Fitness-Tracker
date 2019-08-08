import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { TrainingService } from './trainig.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  currentTraining :Subscription;
  startTraining = false;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.currentTraining = this.trainingService.currentExcercise.subscribe(
      excercise=>{
        if(excercise){
          this.startTraining=true;
        }else{
          this.startTraining=false;
        }
      }
    )
  }

}
