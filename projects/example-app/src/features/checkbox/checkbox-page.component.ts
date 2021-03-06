import { Component } from '@angular/core';

@Component({
  host: { class: 'u-block' },
  selector: 'example-checkbox-page',
  templateUrl: './checkbox-page.component.html',
})
export class CheckboxPageComponent {
  public onCheckedChange(isChecked: boolean): void {
    alert(`Checked? ${isChecked ? 'Yes' : 'No'}`);
  }
}
