import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[isVisible]'
})
export class IsVisible {
  @Input('isVisible') visibility: boolean;
  private defaultVisible: string = '';

  constructor(private e: ElementRef, private r: Renderer2) {
    r.setStyle(e.nativeElement, 'font-size', '22px')
  } 
  
  @HostBinding('style.display') visible;

  ngOnInit() {
    if(this.visibility) this.visible = this.defaultVisible;
    else this.visible = 'none';
  }

}
