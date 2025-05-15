import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'add-user',
    component: UserFormComponent
  },
  {
    path: 'edit-user/:id',
    component: UserFormComponent
  },
  {
    path: 'all',
    component: UsersListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
