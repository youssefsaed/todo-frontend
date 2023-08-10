import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login: boolean = false


  constructor(private _AuthService: AuthService) {

  }

  ngOnInit(): void {
 
    // this._AuthService.data.subscribe(() => {
    //   console.log(this._AuthService.data.getValue());
      
    //   if (this._AuthService.data.getValue() == null) {
    //     this.login = false
    //   }
    //   else {
    //     this.login = true
    //   }
    // })

  
    

  }


}
