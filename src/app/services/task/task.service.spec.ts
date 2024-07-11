import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Task } from '../../models/task';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { DATA } from '../../../../data';

describe('TaskService', () => {
  let service: TaskService;
  let httpTesting:HttpTestingController;
  let tasks:Task[]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers:[provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(TaskService);
    httpTesting = TestBed.inject(HttpTestingController);
    tasks=DATA;
  });

  it('should get some tasks', () => {
    service.getAllTask().subscribe((data:Task[])=>{
      expect(data).toBeTruthy();
      expect(data.length).toBe(2);
      
    })
    const req=httpTesting.expectOne(`${environment.URL}Task/GetAllTask`)
    expect(req.request.method).toEqual("GET");
    req.flush(tasks)
  });

  it('should get one task', () => {
    let task:Task=tasks[0];
    let id=25;
    service.getTask(id).subscribe((data:Task)=>{
      expect(data).toBeTruthy();
      expect(data.description).toBe("Adding new tasks");
      expect(data.title).toBe("Tasks");
    })
    const req=httpTesting.expectOne(`${environment.URL}Task/GetTask?id=${id}`)
    expect(req.request.method).toEqual("GET");
    req.flush(task)
  });

  it('should Add one task', () => {
    let task:Task= new Task(1,"Spec Task",'Checking task adition from spec file',true,new Date());
    service.createTask(task).subscribe((res:string)=>{
      expect(res).toBeTruthy();
    });
    const req=httpTesting.expectOne(`${environment.URL}Task/AddTask`)
    expect(req.request.method).toEqual("POST");
    expect(req.request.responseType).toBe("text");
    req.flush("Task Added");
  });

  it('should give error if task addition failed', () => {
    let task:Task= new Task(1,"",'Checking task adition from spec file',true,new Date());
    service.createTask(task).subscribe({
      next:(res:string)=>{
        fail("should failed in addition of task");
      },
      error:(err:HttpErrorResponse)=>{
        expect(err.status).toBe(400);
      }
    });
    const req=httpTesting.expectOne(`${environment.URL}Task/AddTask`)
    expect(req.request.method).toEqual("POST");
    expect(req.request.responseType).toBe("text");
    req.flush("Error",{status:400,statusText:'error'});
  });

  afterEach(()=>{
    httpTesting.verify();
  })
  
});
