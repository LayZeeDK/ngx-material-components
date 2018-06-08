import { ChangeDetectorRef, Renderer2 } from '@angular/core';
import { MDCCheckboxAdapter } from '@material/checkbox';

import { as } from '../common/coercion';

export class MdcCheckboxAdapter implements MDCCheckboxAdapter {
  private readonly animationEndHandlers: Map<EventListener, (() => void)>
    = new Map();
  private readonly changeHandlers: Map<EventListener, (() => void)> = new Map();
  private isAttachedToDom: boolean = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly wrapper: HTMLElement,
    private readonly control: HTMLInputElement,
  ) {}

  readonly afterViewInit = (): void => {
    this.isAttachedToDom = true;
  };

  readonly onDestroy = (): void => {
    this.animationEndHandlers.forEach(deregisterHandler => deregisterHandler());
    this.animationEndHandlers.clear();
    this.changeHandlers.forEach(deregisterHandler => deregisterHandler());
    this.changeHandlers.clear();
    this.isAttachedToDom = false;
  };

  readonly addClass = (className: string): void => {
    this.renderer.addClass(this.wrapper, className);
  };

  readonly deregisterAnimationEndHandler = (handler: EventListener): void => {
    if (!this.animationEndHandlers.has(handler)) {
      return;
    }

    this.animationEndHandlers.get(handler)!();
    this.animationEndHandlers.delete(handler);
  };

  readonly deregisterChangeHandler = (handler: EventListener): void => {
    if (!this.changeHandlers.has(handler)) {
      return;
    }

    this.changeHandlers.get(handler)!();
    this.changeHandlers.delete(handler);
  };

  /**
   * Force-trigger a layout on the root element. This is needed to restart
   * animations correctly. If you find that you do not need to do this, you
   * can simply make it a no-op.
   */
  readonly forceLayout = (): void => {
    this.renderer.setProperty(
      this.wrapper,
      'animation',
      'none');
    setTimeout(0, () => {
      this.renderer.setProperty(
        this.wrapper,
        'animation',
        undefined
      );
      this.changeDetector.markForCheck();
    });
  };

  readonly getNativeControl = (): HTMLInputElement => {
    return this.isAttachedToDom
      ? this.control
      : as(undefined);
  };

  readonly isAttachedToDOM = (): boolean => {
    return this.isAttachedToDom;
  };

  readonly registerAnimationEndHandler = (handler: EventListener): void => {
    this.animationEndHandlers.set(
      handler,
      this.renderer.listen(this.wrapper, 'animationend', handler));
  };

  readonly registerChangeHandler = (handler: EventListener): void => {
    this.changeHandlers.set(
        handler,
        this.renderer.listen(this.control, 'change', handler));
  };

  readonly removeClass = (className: string): void => {
    this.renderer.removeClass(this.wrapper, className);
  };

  readonly removeNativeControlAttr = (attr: string): void => {
    this.renderer.removeAttribute(this.control, attr);
  };

  readonly setNativeControlAttr = (attr: string, value: string): void => {
    this.renderer.setAttribute(this.control, attr, value);
  };
}
