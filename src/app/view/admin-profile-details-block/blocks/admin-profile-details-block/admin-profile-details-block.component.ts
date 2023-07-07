import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../../../../store/admin-profile-store/services/admin-profile.service';

@Component({
  selector: 'admin-profile-details-block',
  templateUrl: './admin-profile-details-block.component.html',
  styleUrls: ['./admin-profile-details-block.component.scss'],
})
export class AdminProfileDetailsBlockComponent implements OnInit {
  constructor(private _adminProfileService: AdminProfileService) {}
  ngOnInit() {
    // this._adminProfileService.getUsers().subscribe(console.log);
  }
}
