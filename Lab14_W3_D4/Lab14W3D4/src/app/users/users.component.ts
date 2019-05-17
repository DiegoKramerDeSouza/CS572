import { Component, OnInit } from '@angular/core';
import { CollectusersService } from '../collectusers.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ['li {padding: 10px}']
})
export class UsersComponent implements OnInit {

  private users: any;
  constructor(private service: CollectusersService) { 
    this.users = this.service.getCachedData().results;
  }

  ngOnInit() {
  }

}
