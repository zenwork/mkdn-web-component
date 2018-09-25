import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {MkdnStoryComponent} from './mkdn-story/mkdn-story.component';

@NgModule({
    declarations: [
        MkdnStoryComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    entryComponents: [
        MkdnStoryComponent
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const el = createCustomElement(MkdnStoryComponent, {injector: this.injector});
        customElements.define('mkdn-story', el);
        customElements.define('mkdn-story-2', el);
    }
}
