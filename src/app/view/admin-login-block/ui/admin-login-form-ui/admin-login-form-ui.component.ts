import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.scss'],
})
export class AdminLoginFormUiComponent implements OnInit {
  @Input() formError: string | null = '';
  @Input() disabled: boolean | null = false;

  @Output() login = new EventEmitter();

  public formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onFormChange() {
    this.formError = '';
  }

  public onSubmit(): void {
    console.log(this.formGroup.value);
    this.login.emit(this.formGroup.value);
  }
}
