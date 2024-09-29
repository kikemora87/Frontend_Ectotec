import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ProjectComponent } from './Pages/project/project.component';
import { LoginComponent } from './Pages/login/login.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'inicio',component:InicioComponent, canActivate:[authGuard]},
    {path:'project/:id',component:ProjectComponent, canActivate:[authGuard]},
];
