import { Component, Input, ViewChild } from '@angular/core';
import { CollectusersService } from './collectusers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input() placeholder = 'Enter a UUID';
  @ViewChild('userId') userId;
  public userUUID: string;
  private subscription: Subscription;

  title = 'Users';
  constructor(public service: CollectusersService) { 

    this.subscription = this.service.getOnlineData()
                            .subscribe(data => localStorage.setItem('users', JSON.stringify(data)));
  }
  inputUser(){
    this.userUUID = this.userId.nativeElement.value;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
