import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {MdStoryComponent} from './md-story/md-story.component';
import {NgElement, WithProperties} from '@angular/elements';

@Injectable({
    providedIn: 'root'
})
export class MdStoryService {

    constructor(private injector: Injector,
                private applicationRef: ApplicationRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    // Previous dynamic-loading method required you to set up infrastructure
    // before adding the popup to the DOM.
    showAsComponent() {
        // Create element
        const md = document.createElement('md-story-component');

        // Create the component and wire it up with the element
        const factory = this.componentFactoryResolver.resolveComponentFactory(MdStoryComponent);
        const mdRef = factory.create(this.injector, [], md);

        // Attach to the view so that the change detector knows to run
        this.applicationRef.attachView(mdRef.hostView);

        // Listen to the close event
        // mdRef.instance.closed.subscribe(() => {
        //     document.body.removeChild(md);
        //     this.applicationRef.detachView(mdRef.hostView);
        // });

        // Set the message
        // mdRef.instance.message = message;

        // Add to the DOM
        document.body.appendChild(md);
    }

    // This uses the new custom-element method to add the popup to the DOM.
    showAsElement() {
        // Create element
        const mdEl: NgElement & WithProperties<MdStoryComponent> = document.createElement('md-story-element') as any;

        // Listen to the close event
        // mdEl.addEventListener('closed', () => document.body.removeChild(mdEl));

        // Set the message
        // mdEl.message = message;

        // Add to the DOM
        document.body.appendChild(mdEl);
    }
}
