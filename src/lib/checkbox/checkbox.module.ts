import { NgModule } from '@angular/core';

import { MdcCheckboxDirective } from './checkbox.directive';

@NgModule({
  declarations: [MdcCheckboxDirective],
  exports: [MdcCheckboxDirective],
})
export class MdcCheckboxModule {}
