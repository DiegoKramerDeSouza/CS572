import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Counters';
  counter: number = 0;
  componentCounterValue: number = 0;
  componentCounterValue2: number = 0;

  counterChanged(value){
    this.counter = value;
    this.componentCounterValue = value;
  }

  counterChanged2(value){
    this.counter = value;
    this.componentCounterValue2 = value;
  }
}
