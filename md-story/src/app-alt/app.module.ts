import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {MdStoryComponent} from './md-story/md-story.component';

@NgModule({
    declarations: [MdStoryComponent],
    imports: [BrowserModule],
    bootstrap: [MdStoryComponent],
    entryComponents:[MdStoryComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        const appElement = createCustomElement(MdStoryComponent, {injector: this.injector});
        customElements.define('md-story', appElement);
    }
}
