import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgIf,ReactiveFormsModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLogging:boolean=true;
  username: string='';
  password: string='';
  loginForm:FormGroup;
  navigationLink:string='';
  navigationMessage:string='';

  constructor(private form:FormBuilder, private auth:AuthService,private router:Router){
    if(this.auth.isAuthenticated){
      console.log("called");
      this.router.navigate(['/user']);
    }
  }

  ngOnInit(): void {
    this.checkRoute();
    this.loginForm = this.form.group({
      username: ['lavkumar@gmail.com', [Validators.required,Validators.email]],
      password: ['1234567890', Validators.required]
    });
  }

  checkRoute(): void {
    const currentRoute = window.location.href;
    this.isLogging = currentRoute.includes('login');
    this.navigationLink= (this.isLogging) ? '/signup':'/login';
    this.navigationMessage= (this.isLogging) ? 'Don\'t you have an account? Create':'Already have an account? Sign in';
  }

  authenticate(){
    this.auth.login(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value,this.isLogging).subscribe(response => {
      if (response) {
        this.router.navigate(['/user']);
      } else {
        alert('Login failed');
      }
    });
  }

}
