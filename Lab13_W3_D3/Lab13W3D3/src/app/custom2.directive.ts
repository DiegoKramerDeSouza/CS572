import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[makeBigger]'
})
export class MakeBigger {
  @Input('makeBigger') initial;
  @Input('style.font-size.px') size;
  private defaultSize: number = 22;

  constructor(private e: ElementRef, private r: Renderer2) {} 
  
  @HostBinding('style.font-size') contentSize;
  @HostListener('dblclick') increaseSize(){ 
    this.size += 2;
    this.contentSize = this.size + 'px';
    //this.r.setStyle(this.e.nativeElement, 'font-size', this.size + 'px');
  }

  ngOnInit() {
    if(!this.size) this.size = this.defaultSize;
    this.contentSize = this.size + 'px';
    //this.r.setStyle(this.e.nativeElement, 'font-size', this.size + 'px');
  }

}
