import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckboxModule, CheckboxPageComponent } from '../features/checkbox';

const routes: Routes = [
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/checkbox' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CheckboxModule,
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule {}
