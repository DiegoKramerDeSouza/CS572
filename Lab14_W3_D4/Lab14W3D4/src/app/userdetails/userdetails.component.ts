import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectusersService } from '../collectusers.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styles: ['li {padding: 10px}']
})
export class UserdetailsComponent implements OnInit {

  private users: any;
  private collection: any;
  private subscription: Subscription;

  constructor(private service: CollectusersService, private router: ActivatedRoute) { 
    this.collection = this.service.getCachedData().results;
    this. subscription = this.router.params.subscribe(param => {
      this.users = this.collection.filter(user => user.login.uuid == param.uuid);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
