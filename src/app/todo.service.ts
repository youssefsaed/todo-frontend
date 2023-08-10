import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService  {

  constructor(private http: HttpClient) { }

  getToDo(token: string | null): Observable<any> {
    return this.http.get(`/App/toDo/getToDoWithUser`, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      },

    })
  }

  addToDo(data: object, token: string | null): Observable<any> {
    return this.http.post(`/App/toDo/addTodo`, data, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteToDo(id: string, token: string | null): Observable<any> {
    return this.http.delete(`/App/toDo/deleteTodo?DoId=${id}`, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  updateToDo(id: string, data: object, token: string | null): Observable<any> {
    return this.http.put(`/App/toDo/updateTodo?DoId=${id}`, data, {
      headers:
      {
        'authorization': `kjki__${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  

}

