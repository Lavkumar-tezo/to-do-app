import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveComponent } from './active.component';
import { TaskService } from '../../services/task/task.service';
import { DATA } from '../../../../data';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ActiveComponent', () => {
  let component: ActiveComponent;
  let fixture: ComponentFixture<ActiveComponent>;
  let service:jasmine.SpyObj<TaskService>;
  let el:DebugElement;
  beforeEach(async () => {
    const taskService={
      getAllTask: jasmine.createSpy('getAllTask').and.returnValue(of(DATA)),
      taskChanged: {
        subscribe: jasmine.createSpy('subscribe').and.returnValue({
          unsubscribe: jasmine.createSpy('unsubscribe')
        })
      }
    };
    await TestBed.configureTestingModule({
      imports: [ActiveComponent],
      providers:[{
        provide:TaskService,useValue:taskService
      }]
    })
    .compileComponents();
    service=TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(ActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el=fixture.debugElement;
  });

  it("should have active tasks",()=>{
    fixture.detectChanges();
    expect(el.queryAll(By.css("app-task")).length).toBeTruthy();
    const activeComponent:HTMLElement=fixture.nativeElement;
    console.log(activeComponent);
  })

});
