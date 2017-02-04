import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
@Modal()
export class LoginModalComponent {

  loginStatus: boolean = true;
  closeModal: Function;
  userCreds;

  constructor() { }

  onCancel(): void {
    this.closeModal();
  }

  onSubmit(formCreds): void {
    event.preventDefault();

    console.log(formCreds);

    console.log(this.userCreds);

    if ((formCreds.username === this.userCreds.username) && (formCreds.password === this.userCreds.password)) {
      this.loginStatus = true;
      this.closeModal();
    } else {
      this.loginStatus = false;
    }
  }

}