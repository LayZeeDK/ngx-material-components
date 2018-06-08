import { NgModule } from '@angular/core';

import { MdcCheckboxComponent } from './checkbox.component';
import { MdcCheckboxDirective } from './checkbox.directive';

@NgModule({
  declarations: [
    MdcCheckboxComponent,
    MdcCheckboxDirective,
  ],
  exports: [
    MdcCheckboxComponent,
    MdcCheckboxDirective,
  ],
})
export class MdcCheckboxModule {}
