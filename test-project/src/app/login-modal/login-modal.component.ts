import { Component } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
// the Modal import allows the usage of the @Modal alias that adds the Modal functions.
@Modal()
export class LoginModalComponent {

  loginStatus = true;
  closeModal: Function;

  // will hold modal paramaters passed from parent component
  modalParams;

  constructor() { }

  onCancel(): void {
    this.closeModal();
  }

  onSubmit(formCreds): void {
    console.log(this.modalParams);
    event.preventDefault();

    if ((formCreds.username === this.modalParams.username) && (formCreds.password === this.modalParams.password)) {
      this.loginStatus = true;
      this.closeModal();
    } else {
      this.loginStatus = false;
    }
  }
}
