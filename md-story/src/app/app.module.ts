import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {AppComponent} from './app.component';

import {MkdnStoryComponent} from './mkdn-story/mkdn-story.component';

@NgModule({
    declarations: [
        AppComponent,
        MkdnStoryComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    // bootstrap: [AppComponent],
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
    }
}
