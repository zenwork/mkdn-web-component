import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { MdStoryComponent } from './md-story/md-story.component';

@NgModule({
    declarations: [AppComponent, MdStoryComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
    entryComponents: [MdStoryComponent]
})
export class AppModule {}
