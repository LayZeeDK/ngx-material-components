import {
  AfterViewInit,
  Directive,
  Host,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { MdcCheckboxRenderer } from './checkbox.renderer';

@Directive({
  selector: 'input[type=checkbox][mdcCheckbox]',
  providers: [
    MdcCheckboxRenderer,
  ],
})
export class MdcCheckboxDirective implements AfterViewInit, OnDestroy, OnInit {
  constructor(
    @Host()
    private readonly renderer: MdcCheckboxRenderer,
  ) {}

  ngOnInit(): void {
    this.renderer.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.renderer.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.renderer.ngOnDestroy();
  }
}
