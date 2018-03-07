import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
