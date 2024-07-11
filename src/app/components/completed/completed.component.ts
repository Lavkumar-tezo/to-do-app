import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { TaskComponent } from '../task/task.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [NgFor,TaskComponent,CommonModule,TaskComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  todayDate:Date;
  tasks:Task[]=[];
  selectedTask:Number;
  subscription:Subscription;
  constructor(private taskService:TaskService){
  }
  ngOnInit(): void {
    this.fetchCompletedTasks();
    this.todayDate=new Date();
    this.subscription=this.taskService.taskChanged.subscribe((data)=>{
      this.fetchCompletedTasks();
    })
  }

  fetchCompletedTasks(){
    this.taskService.getAllTask().subscribe((data)=>{
      this.tasks=data.filter(task=> task.isActive==false);
    });
  }

  

  setSelectedTask(value:Number){
    this.selectedTask=(value==this.selectedTask)? 0:value;
  }
  
}
