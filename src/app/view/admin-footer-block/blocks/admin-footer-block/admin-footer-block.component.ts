import { Component } from '@angular/core';

@Component({
  selector: 'admin-footer-block',
  templateUrl: './admin-footer-block.component.html',
  styleUrls: ['./admin-footer-block.component.scss'],
})
export class AdminFooterBlockComponent {
  public date = Date.now();
}
