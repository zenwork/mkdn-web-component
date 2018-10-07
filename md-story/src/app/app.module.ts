import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
    declarations: [AppComponent,],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const AppElement = createCustomElement(AppComponent, {injector: this.injector});
        customElements.define('md-story', AppElement);
    }
}
