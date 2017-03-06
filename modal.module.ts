import {
    ComponentFactory, Component, NgModule, ViewChild,
    OnInit, ViewContainerRef, Compiler, ReflectiveInjector,
    Injectable, Injector, ComponentRef
} from "@angular/core";
import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs/Rx";

// the modalservice
@Injectable()
export class ModalService {
    private vcRef: ViewContainerRef;
    private injector: Injector;
    public activeInstances: number = 0;

    constructor(private compiler: Compiler) {
    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    createFromFactory<T>(componentFactory: ComponentFactory<T>,
        parameters?: Object): Observable<ComponentRef<T>> {
        let componentRef$ = new ReplaySubject();
        const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        let componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        this.activeInstances++;
        componentRef.instance["destroy"] = () => {
            this.activeInstances--;
            componentRef.destroy();
        };
        componentRef$.next(componentRef);
        componentRef$.complete();
        return componentRef$.asObservable();
    }
}

// this is the modal-placeholder, it will container the created modals
@Component({
    selector: "modal-placeholder",
    templateUrl: './modal.module.html',
    // TODO: add basic scss style.
    styleUrls: ['./modal.module.css']
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("modalplaceholder", { read: ViewContainerRef }) viewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {

    }
    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}

// These 2 items will make sure that you can annotate
// a modalcomponent with @Modal()
export class ModalContainer {
    destroy: Function;
    componentIndex: number;
    closeModal(): void {
        this.destroy();
    }
}
export function Modal() {
    return function (target) {
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