import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveComponent } from './components/active/active.component';
import { CompletedComponent } from './components/completed/completed.component';
import { TaskModelComponent } from './components/task-model/task-model.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: "full"
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'signup',
        component:LoginComponent
    },
    {
        path:'user',
        component:MainComponent,
        canActivate:[authGuard],
        children:[{
            path:'',
            redirectTo:'dashboard',
            pathMatch:'full'
        },
        {
            path:'dashboard',
            component:DashboardComponent
        },
        {
            path:'addtask',
            component:TaskModelComponent
        },
        {
            path:"edittask/:id",
            component:TaskModelComponent
        },
        {
            path:'active',
            component:ActiveComponent
        },
        {
            path:'completed',
            component:CompletedComponent
        }]
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch: "full"
    }
];
