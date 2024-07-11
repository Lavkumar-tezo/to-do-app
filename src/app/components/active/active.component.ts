import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-active',
  standalone: true,
  imports: [DatePipe,CommonModule,TaskComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent  implements OnInit,OnDestroy{
  todayDate:Date;
  tasks:Task[]=[];
  selectedTask:Number;
  subscription:Subscription;
  constructor(private taskService:TaskService){
  }

  ngOnInit(): void {
    this.fetchActiveTasks();
    this.todayDate=new Date();
    this.subscription=this.taskService.taskChanged.subscribe((data)=>{
      this.fetchActiveTasks();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchActiveTasks(){
    this.taskService.getAllTask().subscribe((data)=>{
      this.tasks=data.filter(task=> task.isActive==true);
    });
  }

  setSelectedTask(value:Number){
    this.selectedTask=(value==this.selectedTask)? 0:value;
  }
}
