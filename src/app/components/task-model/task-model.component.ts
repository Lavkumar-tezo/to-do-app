import { CommonModule,Location } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-model',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './task-model.component.html',
  styleUrl: './task-model.component.css'
})
export class TaskModelComponent implements OnInit {
  taskForm:FormGroup;
  task:Task;
  isEditTask:boolean;
  constructor(private taskService:TaskService,private location:Location,private form:FormBuilder){

  }

  ngOnInit(): void {
      this.taskForm=this.form.group({
        taskTitle:[null,[Validators.minLength(3)]],
        taskDesc:[null,[Validators.maxLength(100),Validators.minLength(3)]]
      });
      if(this.taskService.editTaskId!=0){
        this.isEditTask=true;
        this.taskService.getTask(this.taskService.editTaskId).subscribe(res=>{
          this.taskForm.patchValue({
            taskTitle:res.title,
            taskDesc:res.description
          })
        })
      }
  }
  

  closeModal(){
    this.taskService.changeSelectedTaskId();
  }

  saveTask(){
    if(this.taskService.editTaskId!=0){
      this.taskService.updateTask(new Task(this.taskService.editTaskId,this.taskForm.controls['taskTitle'].value,this.taskForm.controls['taskDesc'].value,true,new Date())).subscribe()
      console.log('task updated');
    }
    else{
      this.taskService.createTask(new Task(this.taskService.editTaskId,this.taskForm.controls['taskTitle'].value,this.taskForm.controls['taskDesc'].value,true,new Date())).subscribe();
      console.log('task added')
    }
    this.closeModal()
  }

}
