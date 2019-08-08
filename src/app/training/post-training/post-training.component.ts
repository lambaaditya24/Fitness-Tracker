import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excercise } from '../training/excercise.model';
import { TrainingService } from '../training/trainig.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-training',
  templateUrl: './post-training.component.html',
  styleUrls: ['./post-training.component.css']
})
export class PostTrainingComponent implements OnInit,AfterViewInit,OnDestroy {
  finishedExcercise :Subscription;
  displayedColumns=['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Excercise>();
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.finishedExcercise =  this.trainingService.pastExcercises.subscribe((excercise:Excercise[])=>{
      this.dataSource.data = excercise
    })  
    this.trainingService.fetchpastExcercises();

  }

  ngAfterViewInit(){
    this.dataSource.sort  = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value:string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.finishedExcercise.unsubscribe()
  }
}
