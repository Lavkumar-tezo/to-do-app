import { Component, DoCheck, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskService } from '../../services/task/task.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements DoCheck {
  @Input('task') task:Task;
  @Output() selectedTaskEmitter:EventEmitter<Number>= new EventEmitter<Number>();
  @Input('selectedTask') selectedTask:Number
  isDetailVisible:boolean=false;

  constructor(private taskService:TaskService,private route:Router){

  }

  ngDoCheck(): void {
  }

  updateStatus(event:Event){
    this.task.isActive = !this.task.isActive;
    this.taskService.updateTaskStatus(this.task.id).subscribe();
  }

  showPopUp(event:Event){
    event.stopPropagation();
    this.selectedTaskEmitter.emit(this.task.id)
  }

  editTask(){
    this.taskService.changeSelectedTaskId(this.task.id);
  }

  deletTask(){
    this.taskService.deleteTask(this.task.id).subscribe();
  }

  calculateDuration() {
    const taskDate = new Date(this.task.createdOn);
    const currentDate = new Date();
    const msInHour = 3600000;
    const msInDay = 86400000;
    const msInWeek = 604800000;
    const msInMonth = 2629800000;
    const msInYear = 31557600000;

    const durationMs = currentDate.getTime() - taskDate.getTime();

    if (durationMs < msInDay) {
      const hours = Math.floor(durationMs / msInHour);
      return `${hours} hours ago`;
    } else if (durationMs < msInWeek) {
      const days = Math.floor(durationMs / msInDay);
      return `${days} days ago`;
    } else if (durationMs < msInMonth) {
      const weeks = Math.floor(durationMs / msInWeek);
      return `${weeks} weeks ago`;
    } else if (durationMs < msInYear) {
      const months = Math.floor(durationMs / msInMonth);
      return `${months} months ago`;
    } else {
      const years = Math.floor(durationMs / msInYear);
      return `${years} years ago`;
    }
  }
}
