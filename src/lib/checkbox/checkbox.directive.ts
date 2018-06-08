import {
  AfterViewInit,
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { MDCCheckboxFoundation } from '@material/checkbox';

import { MdcCheckboxAdapter } from './checkbox.adapter';
import { MdcCheckboxRenderer } from './checkbox.renderer';

@Directive({
  selector: 'input[type=checkbox][mdcCheckbox]',
  providers: [
    MdcCheckboxRenderer,
  ],
})
export class MdcCheckboxDirective implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Available on init.
   */
  private get adapter(): MdcCheckboxAdapter {
    return this.renderer.adapter;
  }
  /**
   * Initialized after view init. Available on init.
   */
  private get foundation(): MDCCheckboxFoundation {
    return this.renderer.foundation;
  }

  @Output()
  public readonly checkedChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    @Self()
    private readonly renderer: MdcCheckboxRenderer,
  ) {}

  ngOnInit(): void {
    this.renderer.ngOnInit();
    this.adapter.registerChangeHandler(() =>
      this.checkedChange.emit(this.foundation.isChecked()));
  }

  ngAfterViewInit(): void {
    this.renderer.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.renderer.ngOnDestroy();
  }
}
