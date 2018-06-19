# Material Components for Angular (ngx-material-components)

Material Components for Angular web apps.

Angular Components implementing [*Material Components for the Web*](https://material.io/develop/web) Adapters.

## Installation

Install using NPM CLI
```
npm install --save ngx-material-components
```

or using Yarn CLI
```
yarn add ngx-material-components
```

## Checkbox

### Sass imports
```scss
// styles.scss
@import "~@material/ripple/mdc-ripple";
@import "~@material/checkbox/mdc-checkbox";
@import "~@material/form-field/mdc-form-field"; // Optional - for example below
```

### Angular Module import

```typescript
// my-feature.module.ts
import { MdcCheckboxModule } from 'ngx-material-components';

@NgModule({
  imports: [
    MdcCheckboxModule,
  ],
})
export class MyFeatureModule {}
```

### Template usage

```html
<!-- my-feature.component.html -->
<div class="mdc-form-field">
  <mdc-checkbox
    [checked]="true"
    controlId="my-checkbox"
    [disabled]="false"
    [indeterminate]="false"
    name="post-name"
    value="post-value"
    (checkedChange)="onCheckedChange($event)"></mdc-checkbox>

  <label for="my-checkbox">
    My checkbox
  </label>
</div>
```
