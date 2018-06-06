import { NgModule } from '@angular/core';
import { MdcCheckboxModule } from 'ngx-material-components';

import { CheckboxPageComponent } from './checkbox-page.component';

@NgModule({
  declarations: [
    CheckboxPageComponent,
  ],
  imports: [
    MdcCheckboxModule,
  ],
})
export class CheckboxModule {}
