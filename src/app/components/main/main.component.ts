import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TaskModelComponent } from '../task-model/task-model.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, TaskModelComponent,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit,OnDestroy {
  options = [
    { optionName: 'Dashboard', link: 'dashboard' },
    { optionName: 'Active', link: 'active' },
    { optionName: 'Completed', link: 'completed' },
  ];
  selectedOption = this.options[0];
  isOpen = false;
  isMobileLayout:boolean
  showModal = false;
  isDropdownOpen = false;
  usedLink: any;
  subscription:Subscription;

  constructor(private route: Router, private auth: AuthService,private taskService:TaskService) {

  }

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth <= 520
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 520;
    this.setUsedLinkPath((this.route.url).substring(1));
    this.subscription=this.taskService.editTaskIdChange.subscribe((value)=>{
      this.showModal=(value !=0);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectOption(option: any) {
    this.usedLink = option;
    this.isDropdownOpen = false;
  }

  get unUsedLink() {
    return this.options.filter(opt => opt.link !== this.usedLink.link);
  }


  private setUsedLinkPath(path: string) {
    this.usedLink = this.options.find(option => option.link === path) || this.options[0];
  }

  onSignOut() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  openModel(event:Event){
    event.stopPropagation();
    this.showModal=true;
  }

  closeModel(){
    this.taskService.changeSelectedTaskId();
  }

}
