import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any = new BehaviorSubject(null)
  constructor(private http: HttpClient) { }


  sendRegister(data: object): Observable<any> {
    return this.http.post(`/App/toDo/signUp`, data)
  }
  sendlogIn(data: object): Observable<any> {
    return this.http.post(`/App/toDo/logIn`, data)
  }
  getUser( token: string | null): Observable<any> {
    return this.http.get(`/App/toDo/getUser`, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  updateUser( token: string | null,data:object): Observable<any> {
    return this.http.put(`/App/toDo/updateUser`,data, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  deleteUser( token: string | null): Observable<any> {
    return this.http.delete(`/App/toDo/deleteUser`, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
 
  getData() {
     this.data.next(localStorage.getItem('token'))
  }

}
