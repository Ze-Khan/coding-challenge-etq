import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersService } from './users/users.service';
import { ListUserComponent } from './users/list-user/list-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { routing } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [BrowserModule, HttpClientModule, routing, ReactiveFormsModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
