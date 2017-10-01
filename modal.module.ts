import {
    NgModuleRef, ComponentFactory, Component, NgModule, ViewChild,
    OnInit, ViewContainerRef, Compiler, ReflectiveInjector,
    Injectable, Injector, ComponentRef
} from "@angular/core";
import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs/Rx";

// the modalservice
@Injectable()
export class ModalService {
    private vcRef: ViewContainerRef;
    private injector: Injector;
    private amRef: NgModuleRef<any>;
    public activeInstances: number = 0;

    constructor(private compiler: Compiler, private moduleRef: NgModuleRef<any>) {
    }

    registerAppModuleRef(amRef: NgModuleRef<any>): void {
        this.amRef = amRef;
    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    create<T>(component: any, parameters?: Object):
        Observable<ComponentRef<T>> {
        // we return a stream so we can  access the componentref
        let componentRef$: ReplaySubject<ComponentRef<T>> = new ReplaySubject<ComponentRef<T>>();
        // compile the component based on its type and
        // create a component factory
        this.compiler.compileModuleAndAllComponentsAsync(this.moduleRef.instance)
            .then(factory => {
                // look for the componentfactory in the modulefactory
                let componentFactory: ComponentFactory<any> = factory.componentFactories
                    .filter(item => item.componentType === component)[0];
                // the injector will be needed for DI in
                // the custom component
                const childInjector: ReflectiveInjector = ReflectiveInjector
                    .resolveAndCreate([], this.injector);
                // create the actual component
                let componentRef: ComponentRef<any> = this.vcRef
                    .createComponent(componentFactory, 0, childInjector);
                // pass the @Input parameters to the instance
                Object.assign(componentRef.instance, parameters);
                this.activeInstances++;
                // add a destroy method to the modal instance
                componentRef.instance.destroy = () => {
                    this.activeInstances--;
                    // this will destroy the component
                    componentRef.destroy();
                };
                // the component is rendered into the ViewContainerRef
                // so we can update and complete the stream
                componentRef$.next(componentRef);
                componentRef$.complete();
            });
        return componentRef$.asObservable();
    }

    createFromFactory<T>(componentFactory: ComponentFactory<T>,
        parameters?: Object): Observable<ComponentRef<T>> {
        let componentRef$: ReplaySubject<ComponentRef<T>> = new ReplaySubject<ComponentRef<T>>();
        const childInjector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        let componentRef: any = this.vcRef.createComponent(componentFactory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        this.activeInstances++;
        componentRef.instance.destroy = () => {
            this.activeInstances--;
            componentRef.destroy();
        };
        componentRef$.next(componentRef);
        componentRef$.complete();
        return componentRef$.asObservable();
    }
}

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