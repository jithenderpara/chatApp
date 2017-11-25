import { Directive,ElementRef,HostListener } from '@angular/core';


@Directive({
  selector: '[Chatbox]'
})
export class ChatboxDirective {
  constructor(el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
