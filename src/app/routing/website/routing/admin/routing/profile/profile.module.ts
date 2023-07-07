import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RouterModule } from '@angular/router';
import { AdminProfileDetailsBlockModule } from '../../../../../../view/admin-profile-details-block/admin-profile-details-block.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePageComponent,
      },
    ]),
    AdminProfileDetailsBlockModule,
  ],
})
export class ProfileModule {}
