import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService:jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    const authSpy=jasmine.createSpyObj("AuthService",["login"])
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers:[
        FormBuilder,{
          provide:AuthService,useValue:authSpy
        },Router
      ]
    })
    .compileComponents();
    authService=TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have three inputs",()=>{
    console.log(fixture.nativeElement);
  })
});
