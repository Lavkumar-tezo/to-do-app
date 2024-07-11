import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import { Task } from '../../models/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskChangedSubject:Subject<void>= new Subject<void>();
  taskChanged:Observable<void>= this.taskChangedSubject.asObservable();
  tasks:Task[]=[];
  editTaskId:Number=0;
  editTaskIdChange:Subject<Number>= new Subject<Number>();
  constructor(private http:HttpClient) {
  }

  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>(environment.URL + 'Task/GetAllTask');
  }


  getTask(id:Number):Observable<Task>{
    let params=new HttpParams().set('id',id.toString());
    return this.http.get<Task>(environment.URL+'Task/GetTask',{
      params:params
    });
  }

  changeSelectedTaskId(id:Number=0){
    this.editTaskId=id;
    this.editTaskIdChange.next(this.editTaskId);
  }

  createTask(task:Task){
    return this.http.post(environment.URL+'Task/AddTask',task,{ responseType:'text'}).pipe(
      tap(()=>{
        this.taskChangedSubject.next();
      })
    );
  }

  updateTask(task:Task){
    return this.http.put(environment.URL+'Task/UpdateTask',task,{ responseType:'text'}).pipe(
      tap(()=>{
        this.taskChangedSubject.next();
      })
    );
  }

  updateTaskStatus(id:Number){
    let param=new HttpParams().set('id', id.toString());
    return this.http.put(environment.URL+'Task/UpdateTaskStatus',null,{
      responseType:'text',
      params:param
    }).pipe(
      tap(()=>{
        this.taskChangedSubject.next();
      })
    );
  }


  deleteTask(id:Number){
    let param:HttpParams= new HttpParams();
    param=param.set("id",id.toString());
    return this.http.delete(environment.URL+'Task/DeleteTask',{
      responseType:'text',
      params:param
    }).pipe(
      tap(()=>{
        this.taskChangedSubject.next();
      })
    );;
  }

  deleteAllTasks(){
    return this.http.delete(environment.URL+'Task/DeleteAllTask',{
      responseType:'text'
    }).pipe(
      tap(()=>{
        this.taskChangedSubject.next();
      })
    );
  }
}
