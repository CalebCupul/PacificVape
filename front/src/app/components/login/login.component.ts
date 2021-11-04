import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token : any;
  public identity: any;
  public data_error: any;
  

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.user = new User('','','','','','','');
   }

  ngOnInit(): void {
  }

  close_alert(){
    this.data_error = '';
  }

  login(loginForm:any){
    if(loginForm.valid){

      this._userService.login(this.user).subscribe(
        response =>{
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user).subscribe(
            response =>{
              localStorage.setItem('identity', JSON.stringify(response.user));
              this._router.navigate(['dashboard']);
            },
            error =>{
              
            }
          )
        },
        error =>{
          this.data_error = error.error.message;
        }
      )
    }else{
    }
  }

}
