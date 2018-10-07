import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'md-story',
    template: `
        <p>
            md-story works! ({{randomNumber}})
        </p>
    `,
    styles: []
})
export class MdStoryComponent implements OnInit {
    randomNumber = Math.random();

    constructor() {

    }

    ngOnInit() {
    }

}
