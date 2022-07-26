import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHideAfter]'
})
export class HideAfterDirective implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>) { }

  @Input('appHideAfter')
  delay = 0;

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template)

    setTimeout(() => {
      this.viewContainerRef.clear()
    }, this.delay);

  }

}
