import { Component, ViewChild, OnInit, ViewContainerRef, Injector } from "@angular/core";
import { ModalService } from "./modal.service";

// this is the modal-placeholder, it will contain the created modals
@Component({
    selector: "app-root",
    template: "<div class='ng2-modal'>" +
        "<div class='ng2-modal-content'>" +
        "<div #modalplaceholder></div>" +
        "</div></div>" +
        "<div class='ng2-modal-overlay'></div>",
    styles: [
        ".ng2-modal {" +
        "/* This way it could be display flex or grid or whatever also. */" +
        "display: block;" +
        "/* Probably need media queries here */" +
        "width: 600px;" +
        "max-width: 100%;" +
        "height: 400px;" +
        "max - height: 100%;" +
        "position: fixed;" +
        "z-index: 9000;" +
        "left: 50 %;" +
        "top: 50 %;" +
        "/* Use this for centering if unknown width/height */" +
        "transform: translate(-50 %, -50 %);" +
        "/* If known, negative margins are probably better (less chance of blurry text). */" +
        "/* margin: -200px 0 0 -200px; */" +
        "background: white;" +
        "box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);" +
        "}",
        ".ng2 - modal - content {" +
        "position: absolute;" +
        "top: 10 %;" +
        "left: 0;" +
        "width: 100 %;" +
        "height: 100 %;" +
        "overflow: auto;" +
        "padding: 20px 50px 20px 20px;" +
        "}",
        ".ng2 - modal - overlay {" +
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100 %;" +
        "height: 100 %;" +
        "z-index: 8000;" +
        "background: rgba(0, 0, 0, 0.6);" +
        "}"
    ]
})

export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("approot", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {

    }
    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}
