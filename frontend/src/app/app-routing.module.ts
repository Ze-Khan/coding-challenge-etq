import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';

const routes: Routes = [
  { path: '', component: ListUserComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'add-user', component: AddUserComponent },
];

export const routing = RouterModule.forRoot(routes);
