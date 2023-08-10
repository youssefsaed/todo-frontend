import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  errorMessage: string = ''

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  SignUpForms = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@(yahoo|gmail|outlook)+\.com$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5,40}')]),
    confirmPassword: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(90)])

  })

  SendData(SignUpForms: FormGroup) {
    this._AuthService.sendRegister(SignUpForms.value).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this._Router.navigate(['LogIn'])
      }
      else {
        this.errorMessage = res.message
      }
    })
  }


}

