import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.patch<User>(`${this.url}/${id}`, user);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }


  delete(id: number | undefined): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
