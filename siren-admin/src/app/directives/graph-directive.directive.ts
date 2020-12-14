import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Directive, ElementRef, OnInit, ContentChildren } from '@angular/core';

@Directive({
  selector: '[myGraph]'
})
export class GraphDirectiveDirective implements OnInit {

  constructor(private ref:ElementRef, private contentChildren:ContentChildren) { }

  ngOnInit(): void {
    console.log(this.ref.nativeElement.children)
    console.log(this.contentChildren.first)
  }

}
