import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileDetailsBlockComponent } from './blocks/admin-profile-details-block/admin-profile-details-block.component';
import { AdminProfileStoreModule } from '../../store/admin-profile-store/admin-profile-store.module';

@NgModule({
  declarations: [AdminProfileDetailsBlockComponent],
  exports: [AdminProfileDetailsBlockComponent],
  imports: [CommonModule, AdminProfileStoreModule],
})
export class AdminProfileDetailsBlockModule {}
