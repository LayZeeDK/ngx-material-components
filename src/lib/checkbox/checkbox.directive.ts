import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
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
export class MdcCheckboxDirective
implements AfterViewInit, OnChanges, OnDestroy, OnInit {
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

  @Input()
  checked: boolean | undefined;
  @Input()
  disabled: boolean | undefined;
  @Input()
  indeterminate: boolean | undefined;
  @Input()
  value: string | undefined;
  @Output()
  readonly checkedChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    @Self()
    private readonly renderer: MdcCheckboxRenderer,
  ) {}

  ngOnChanges(): void {
    this.renderer.synchronizeState();
  }

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
