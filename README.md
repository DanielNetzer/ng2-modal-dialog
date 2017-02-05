# Angular2 Factory Made Modal Dialog
- - - -

A fully generic, customizable and fluent factory modal window implementation for Angular2.
only dependency for this Module is angular itself, works with any style preprocessor as the modal componenet itself gets genereted during runtime.

See the [DEMO](https://danielnetzer.github.io/ng2-modal-dialog/modalexamples/).

### Note
---
This project is very much still a work in progress.

### Installation
---
before you install please make sure you have an up and running angular2 projects,
highly recomended using the [angular-cli](https://github.com/angular/angular-cli) to start one .
```
npm install --save ng2-modal-dialog
```
### Usage
---
* Import the module to your ```app.module.ts``` file and the modal component.
```TypeScript
import { ModalModule } from 'ng2-modal-dialog/modal.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
...
declarations: [
    ...
    LoginModalComponent
  ],
imports: [
   ...
    ModalModule
  ],
```
* In the parent component of the modal you will need to import the following.

```TypeScript
import { ModalService } from 'ng2-modal-dialog/modal.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
// The AppModule from the application src
import { AppModule } from './app.module';
...

// Instancing a new ModalService in the parent component constructor
constructor(private modalService: ModalService) { }

// Click function to open the modal
  openLoginModal(userCreds): void {
  	// Service callback function to create the modal with an object passed as a parameter
    this.modalService.create(AppModule, LoginModalComponent, {userCreds});
  }
```

* ```login-modal.componenet.ts```
```TypeScript
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

  loginStatus: boolean = true;
  closeModal: Function;
  
  // Will fetch the userCreds passed from the callback.
  userCreds;

  constructor() { }

  onCancel(): void {
    this.closeModal();
  }

  onSubmit(formCreds): void {
    event.preventDefault();

    if ((formCreds.username === this.userCreds.username) && (formCreds.password === this.userCreds.password)) {
      this.loginStatus = true;
      this.closeModal();
    } else {
      this.loginStatus = false;
    }
  }
}
```

* ```login-modal.componenet.html```
```html
<!-- Modal Setup -->
<div class="modal">
  <div class="modal-content">
    <h4>Admin login</h4>
    <a role="button" (click)="onCancel()"><i class="icon ion-close-round"></i></a>
    <form (ngSubmit)="onSubmit(loginForm.value);" #loginForm="ngForm">
      <div class="form-group">
        <label class="sr-only" for="username">Email address</label>
        <input type="text" class="form-control" id="name" placeholder="Username" name="username" ngModel required>
      </div>
      <div class="form-group">
        <label class="sr-only" for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" name="password" ngModel required>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Sign in</button>
    </form>
    <h4 style="color:red" *ngIf="!loginStatus">Wrong Credentials! try 'user' as username and 'pass' as password.</h4>
  </div>
</div>
<!-- END Modal Setup -->

<!-- Modal Overlay -->
<div class="modal-overlay"></div>
```

* ```login-modal.componenet.css```
```css
.modal {
    /* This way it could be display flex or grid or whatever also. */
    display: block;
    /* Probably need media queries here */
    width: 600px;
    max-width: 100%;
    height: 400px;
    max-height: 100%;
    position: fixed;
    z-index: 9000;
    left: 50%;
    top: 50%;
    /* Use this for centering if unknown width/height */
    transform: translate(-50%, -50%);
    /* If known, negative margins are probably better (less chance of blurry text). */
    /* margin: -200px 0 0 -200px; */
    background: white;
    box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
}

.modal-content {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px 50px 20px 20px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8000;
    background: rgba(0, 0, 0, 0.6);
}
```

this is a full example of how to use the modal functionality, the component once finished its purpose will be destroyed.

### TODOS
---
* Enhance transition and animation
* Add more functionality to the basic modal component
* Add more close options for the modal (eg. clicking outside of the modal)
* Add more complexed examples showing the usage of passing parameters from a DB/Backend callbacks.

### License
---
MIT
