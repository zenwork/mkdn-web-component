import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {MdStoryComponent} from './md-story/md-story.component';
import {MdStoryService} from "./md-story.service";

@Component({
    selector: 'app-root',
    template: `
        <input #input value="Message">
        <button (click)="md.showAsComponent()">Show as component</button>
        <button (click)="md.showAsElement()">Show as element</button>
    `,
    styles: []
})
export class AppComponent {
    constructor(injector: Injector, public md: MdStoryService) {
        // Convert `PopupComponent` to a custom element.
        const mdStoryElement = createCustomElement(MdStoryComponent, {injector});
        // Register the custom element with the browser.
        customElements.define('md-story-element', mdStoryElement);
    }
}
