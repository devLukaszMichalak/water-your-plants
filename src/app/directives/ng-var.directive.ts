import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngVar]'
})
export class VarDirective<Type> {
  @Input()
  set ngVar(context: Type) {
    this.context.$implicit = this.context.ngVar = context

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this.context)
      this.hasView = true
    }
  }

  private context: { $implicit: Type | null, ngVar: Type | null } = {$implicit: null, ngVar: null}

  private hasView: boolean = false

  constructor(private templateRef: TemplateRef<NgVarContext<Type>>, private vcRef: ViewContainerRef) {
  }

  static ngTemplateContextGuard<Type>(dir: VarDirective<Type>, ctx: NgVarContext<Type>): ctx is NgVarContext<Type> {
    return true
  }
}

interface NgVarContext<T> {
  $implicit: T
  ngVar: T
}
