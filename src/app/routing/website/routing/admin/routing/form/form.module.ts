import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPageComponent } from './form-page/form-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormPageComponent,
      },
    ]),
  ],
})
export class FormModule {}
