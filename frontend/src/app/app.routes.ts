import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list';
import { RobotListComponent } from './components/robot-list/robot-list';
import { PartListComponent } from './components/part-list/part-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { OAuth2CallbackComponent } from './components/oauth2-callback/oauth2-callback';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth2/callback', component: OAuth2CallbackComponent },
  { 
    path: 'categories', 
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'categories/:categoryId/robots', 
    component: RobotListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'robots/:robotId/parts', 
    component: PartListComponent,
    canActivate: [authGuard]
  }
];
