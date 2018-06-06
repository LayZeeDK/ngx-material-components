import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MDCCheckboxAdapter, MDCCheckboxFoundation } from '@material/checkbox';

import { as } from '../common/coercion';

@Component({
  host: { class: 'mdc-checkbox' },
  selector: 'mdc-checkbox',
  templateUrl: './checkbox.component.html',
})
export class MdcCheckboxComponent implements AfterViewInit, OnDestroy {
  @Input()
  public controlId: string | undefined;

  @ViewChild('control')
  public control!: ElementRef<HTMLInputElement>

  private readonly adapter: MDCCheckboxAdapter = {
    addClass: (className: string): void => {
      this.renderer.addClass(this.host.nativeElement, className);
    },
    deregisterAnimationEndHandler: (handler: EventListener): void => {
      if (!this.animationEndHandlers.has(handler)) {
        return;
      }

      this.animationEndHandlers.get(handler)!();
      this.animationEndHandlers.delete(handler);
    },
    deregisterChangeHandler: (handler: EventListener): void => {
      if (!this.changeHandlers.has(handler)) {
        return;
      }

      this.changeHandlers.get(handler)!();
      this.changeHandlers.delete(handler);
    },
    /**
     * Force-trigger a layout on the root element. This is needed to restart
     * animations correctly. If you find that you do not need to do this, you
     * can simply make it a no-op.
     */
    forceLayout: (): void => {
      this.renderer.setProperty(
        this.host.nativeElement,
        'animation',
        'none');
      setTimeout(0, () => {
        this.renderer.setProperty(
          this.host.nativeElement,
          'animation',
          undefined
        );
        this.changeDetector.markForCheck();
      });
    },
    getNativeControl: (): HTMLInputElement => !this.isAttachedToDom
      ? as(undefined)
      : this.control.nativeElement,
    isAttachedToDOM: (): boolean => this.isAttachedToDom,
    registerAnimationEndHandler: (handler: EventListener): void => {
      this.changeHandlers.set(
        handler,
        this.renderer.listen(this.control.nativeElement, 'animationend', handler));
    },
    registerChangeHandler: (handler: EventListener): void => {
      this.changeHandlers.set(
        handler,
        this.renderer.listen(this.control.nativeElement, 'change', handler));
    },
    removeClass: (className: string): void => {
      this.renderer.removeClass(this.host.nativeElement, className);
    },
    removeNativeControlAttr: (attr: string): void => {
      this.renderer.removeAttribute(this.control.nativeElement, attr);
    },
    setNativeControlAttr: (attr: string, value: string): void => {
      this.renderer.setAttribute(this.control.nativeElement, attr, value);
    },
  };
  private readonly animationEndHandlers: Map<EventListener, (() => void)>
    = new Map();
  private readonly changeHandlers: Map<EventListener, (() => void)> = new Map();
  private foundation: MDCCheckboxFoundation =
    new MDCCheckboxFoundation(this.adapter);
  private isAttachedToDom: boolean = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly host: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit(): void {
    this.isAttachedToDom = true;
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
    console.log('animationend handlers left', this.animationEndHandlers.size);
    this.animationEndHandlers.forEach(deregisterHandler => deregisterHandler());
    this.animationEndHandlers.clear();
    console.log('change handlers left', this.changeHandlers.size);
    this.changeHandlers.forEach(deregisterHandler => deregisterHandler());
    this.changeHandlers.clear();
    this.isAttachedToDom = false;
  }
}
