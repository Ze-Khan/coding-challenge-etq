import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class UsersService {
  url = `${environment.apiRoot}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(page: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(this.url, {
      params: { page: page.toString(), limit: limit.toString() },
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateUser(id: number, data: Partial<User>): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}`, data);
  }

  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.url}`, data);
  }
}
