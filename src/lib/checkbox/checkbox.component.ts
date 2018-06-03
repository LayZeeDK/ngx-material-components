import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MDCCheckboxAdapter, MDCCheckboxFoundation } from '@material/checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mdc-checkbox',
  templateUrl: 'checkbox.component.html',
})
export class MdcCheckboxComponent implements OnInit, OnDestroy {
  private readonly _adapter: Partial<MDCCheckboxAdapter> = {
    addClass: (className: string): void => {},
    deregisterAnimationEndHandler: (handler: EventListener): void => {},
    deregisterChangeHandler: (handler: EventListener): void => {},
    forceLayout: (): void => {},
    getNativeControl: (): HTMLInputElement => document.createElement('input'),
    isAttachedToDOM: (): boolean => true,
    registerAnimationEndHandler: (handler: EventListener): void => {},
    registerChangeHandler: (handler: EventListener): void => {},
    removeClass: (className: string): void => {},
  };
  private get adapter(): MDCCheckboxAdapter {
    return this._adapter as MDCCheckboxAdapter;
  }
  private foundation: MDCCheckboxFoundation =
    new MDCCheckboxFoundation(this.adapter);

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }
}
