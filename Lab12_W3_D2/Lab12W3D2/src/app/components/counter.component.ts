import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-counter',
	template: `
		<button (click)="decrease()" #decr>-</button>
		<span> {{ counterValue }} </span>
		<button (click)="increase()" #incr>+</button>
		<br/>
	`
	
})
export class Counter implements OnInit{

	@Input() counter;
	@Input() componentCounterValue;
	@Input() componentCounterValue2;
	@Output() counterChange = new EventEmitter();
	
	ngOnInit(){
		if(this.counter >= 0) this.counterValue = this.counter;
	}
	
	public counterValue: number = 0;

	decrease(){
		this.counterChange.emit(--this.counterValue);
	}
	increase(){
		this.counterChange.emit(++this.counterValue);
	}
}