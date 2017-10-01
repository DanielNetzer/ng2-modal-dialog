import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ng2-modal-dialog/modal.module';
import { LoginModalComponent } from './login-modal/login-modal.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    ModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
