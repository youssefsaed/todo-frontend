import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  errorMessage: string = ''
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  LogInForms = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@(yahoo|gmail|outlook)+\.com$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5,}$')])
  })

  sendData(LogInForms: FormGroup) {
    this._AuthService.sendlogIn(LogInForms.value).subscribe((res) => {
      if (res.message == 'success') {
        localStorage.setItem('token', res.token)

        this._Router.navigate(['home'])
      }
      else {
        this.errorMessage = res.message
      }

    })

  }
}
