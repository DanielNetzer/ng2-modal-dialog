import { Component } from '@angular/core';

// Modal Module Imports
import { ModalService } from 'ng2-modal-dialog/modal.module';

// Our Login Moda
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  modalParams = {
    username: 'user',
    password: 'pass'
  };

  // Instancing a new ModalService in the parent component constructor
  constructor(private modalService: ModalService) { }

  openLoginModal() {
    console.log('Opening Modal');
    const loginModal = this.modalService.create(LoginModalComponent, { modalParams: this.modalParams })
      .subscribe(() => {
        console.log('Modal Opened Successfully');
      }, (err) => {
        console.error(err);
      });
  }
}
