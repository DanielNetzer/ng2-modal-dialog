import { NgModule } from "@angular/core";
import { ModalPlaceholderComponent } from "./modal.component";
import { ModalService } from "./modal.service";

// these 2 items will make sure that you can annotate
// a modalcomponent with @Modal()
export class ModalContainer {
    destroy: Function;
    componentIndex: number;
    closeModal(): void {
        this.destroy();
    }
}

export function Modal(): any {
    return function (target: any): void {
        Object.assign(target.prototype, ModalContainer.prototype);
    };
}

// module definition
@NgModule({
    declarations: [ModalPlaceholderComponent],
    exports: [ModalPlaceholderComponent],
    providers: [ModalService]
})
export class ModalModule {
}