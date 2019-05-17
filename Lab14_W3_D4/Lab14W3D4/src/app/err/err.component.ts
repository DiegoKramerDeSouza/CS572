import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-err',
  templateUrl: './err.component.html',
  styles: ['h3 {color: red};']
})
export class ErrComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
