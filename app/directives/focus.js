import {Renderer, ElementRef, Directive} from 'angular2/core';
import {OnInit} from 'angular2/core';

@Directive({
  selector: '[focus]'
})
export class Focus {
  static get parameters() {
    return [[Renderer], [ElementRef]];
  }
  constructor(renderer, elementRef) {
    this.renderer = renderer;
    this. elementRef = elementRef;
  }
  ngOnInit() {
    //Set the focus to the elements first input
    //This works for like a second, than gets changed by something...
    console.log('invoked');
    var input = this.elementRef.nativeElement.querySelector('input');
    var renderer = this.renderer;
    setTimeout(function() {
      renderer.invokeElementMethod(input, 'focus', []);
    }, 0);
  }
}
