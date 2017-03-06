import { Component } from '@angular/core';

import { ModalService } from 'ng2-modal-dialog/modal.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: ModalService) { }

  title = 'ng2-modal-dialog package example';

  openLoginModal(userCreds): void {
    let loginModal = {

    }
    this.modalService.createFromFactory(LoginModalComponent);
  }
}
