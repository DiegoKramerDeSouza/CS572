import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<app-smart></app-smart>`,
    styles: []
})
export class AppComponent {
    
	visible = true;
	size = 16;
	multiText = 5;
	someText = "Something here!";
}
