import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public identity: any;

  constructor(
    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngOnInit(): void {
  }

}
