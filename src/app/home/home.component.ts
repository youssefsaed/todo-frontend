import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Status } from '../status';
import { TodoService } from '../todo.service';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string | null = ''
  todoArray: Array<any> = []
  notFound: string = ''
  Title: string = ''
  Desc: string = ''
  updateTitle: string = ''
  updateDasc: string = ''
  updateId: string = ''
  comp: Status = { status: "complete" }
  pen: Status = { status: "pending" }
  word: any = ''
  arraTwo: Array<any> = []
  wordEvent: string = ''
  name: string = ''
  email: string = ''
  age: number = 0
  updateError: string = ''
  nameUp: string = ''
  emailUp: string = ''
  ageUp: string = ''
  passwordUp: string = ''


  constructor(private _TodoService: TodoService, private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token')
    this._TodoService.getToDo(this.token).subscribe((res) => {

      if (res.message == 'success') {
        this.todoArray = res.todo
      }
      else {
        this.notFound = res.message
      }
    })

    this._AuthService.getUser(this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.name = res.user.name
        this.email = res.user.email
        this.age = res.user.age
      }

    })



  }

  userForm = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.pattern('[a-zA-Z0-9]{2,}[^!@#$%^&*()\/\\\[\+\-<>?{}[]@(gmail|yahoo|outlook).com')]),
    age: new FormControl(null, [Validators.max(90)]),
    password: new FormControl(null, [Validators.pattern('^[a-zA-Z0-9]{5,}$')])
  })

  updateUser(userForm: FormGroup) {
    this._AuthService.updateUser(this.token, userForm.value).subscribe((res) => {
      if (res.message == 'success') {
        this.ngOnInit()
        this.nameUp = ''
        this.emailUp = ''
        this.ageUp = ''
        this.passwordUp = ''

      }
      else if (res.message == "email is exist change your email") {
        this.updateError = res.message
      }
    })
  }

  deleteUser() {
    this._AuthService.deleteUser(this.token).subscribe((res) => {
      if (res.message == 'success') {
        localStorage.clear()
        this._Router.navigate(['LogIn'])

      }
    })
  }

  logOut()
  {
    localStorage.clear()
    this._Router.navigate(['LogIn'])
  }



  searchForm = new FormGroup({
    searchInput: new FormControl(null, [Validators.maxLength(10)])
  })


  //creat to do
  creatToDoForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(50)])
  })

  add(creatToDoForm: FormGroup) {
    this._TodoService.addToDo(creatToDoForm.value, this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.ngOnInit()
        this.notFound = ''
        this.Title = ''
        this.Desc = ''
        if (this.todoArray.length > 2) {
          $("html, body").animate({
            scrollTop: $(
              'html, body').get(0).scrollHeight
          }, 1000);
        }
      }
    })
  }


  //delet to do
  delete(id: string) {
    this._TodoService.deleteToDo(id, this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.ngOnInit()
      }

    })
  }

  // update to do
  updatePathId(id: any) {
    this.updateId = id
  }

  updateForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(50)])
  })

  update(updateForm: FormGroup) {
    this._TodoService.updateToDo(this.updateId, updateForm.value, this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.updateTitle = ''
        this.updateDasc = ''
        this.ngOnInit()
      }
    })
  }


  complete(id: string) {
    this._TodoService.updateToDo(id, this.comp, this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.ngOnInit()
      }
    })

  }
  pending(id: string) {
    this._TodoService.updateToDo(id, this.pen, this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.ngOnInit()
      }
    })

  }

}

