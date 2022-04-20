import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  @Output() loginBtnSpinner = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      if (this.currentUserSubject == null) {
        return null;
      }
      return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    if (this.currentUserValue != null) {
      return true;
    }
    return false;
  }

  login(email, password, authType) {
    this.loginBtnSpinner.emit(true);
    let headers = {'content-type': 'application/json'};
    console.log(JSON.stringify(new User(email, password)));
    return this.http.post<any>(`http://localhost:8081/${authType}/login`, JSON.stringify(new User(email, password)), {
        'headers': headers
    })
    .pipe(map(user => {
      console.log(user);
      if (user.login) {
        localStorage.setItem('currentUser', user.data);
        this.currentUserSubject.next(user.data);
      }
      this.loginBtnSpinner.emit(false);
      return user;
    }));
  }

  register(email, password, authType) {
    this.loginBtnSpinner.emit(true);
    let headers = {'content-type': 'application/json'};
    console.log(JSON.stringify(new User(email, password)));
    return this.http.post<any>(`http://localhost:8081/${authType}/signup`, JSON.stringify(new User(email, password)), {
        'headers': headers
    })
    .pipe(map(user => {
      console.log(user);
      if (user.data) {
        localStorage.setItem('currentUser', user.data);
        this.currentUserSubject.next(user.data);
      }
      this.loginBtnSpinner.emit(false);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
