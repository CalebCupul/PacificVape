import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBALS';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public identity: any;
  public user: any;
  public url: any

  constructor(
    private _userService: UserService
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngOnInit(): void {
  }

}
