import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe,CommonModule,NgFor,TaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,DoCheck{
  todayDate:Date;
  allTasks:Task[]=[];
  selectedTask:Number;
  percentCompleted:Number;
  percentActive:Number;
  subscription:any;
  constructor(private taskService:TaskService){

  }

  fetchTasks(){
    this.taskService.getAllTask().subscribe((data)=>{
      this.allTasks=data;
    });
    this.allTasks=this.allTasks.sort((a,b)=>Number(a.isActive) - Number(b.isActive));
  }

  ngOnInit(): void {
    this.fetchTasks();
    this.todayDate=new Date();
    this.subscription=this.taskService.taskChanged.subscribe((data)=>{
      this.fetchTasks();
    })
    
  }

  ngDoCheck(): void {
    if (this.allTasks.length === 0) {
      this.percentCompleted = 0;
      this.percentActive = 0;
      return;
    }
    let completedCount: number = 0;
    let activeCount: number = 0;
    this.allTasks.forEach(task => {
      if (task.isActive) {
        activeCount++;
      } else {
        completedCount++;
      }
    });
    this.percentCompleted = Math.floor((completedCount / this.allTasks.length) * 100);
    this.percentActive = Math.ceil((activeCount / this.allTasks.length) * 100);
  }

  setSelectedTask(value:Number){
    this.selectedTask=(value==this.selectedTask)? 0:value;
  }

  deleteAllTask(){
    this.taskService.deleteAllTasks().subscribe();
  }
}
