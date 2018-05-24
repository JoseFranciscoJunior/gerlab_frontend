import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  shared: SharedService;

  constructor(private userService: UserService,
    private router: Router) {
    this.shared = SharedService.getInstance();
    this.shared.user = new User('', '', '', '', '','');
  }

  ngOnInit() {
  }


}
