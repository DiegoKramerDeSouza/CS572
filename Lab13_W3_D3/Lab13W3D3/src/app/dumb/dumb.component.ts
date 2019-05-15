import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  styleUrls: []
})
export class DumbComponent implements OnInit {
	
	@Input() dataObj;
	public visible: boolean = true;
	public size: number = 16;
	public multiText: number = 5;
	public someText: string = 'Text';

	constructor(){
	}

	ngOnInit() {
	}
	
}
