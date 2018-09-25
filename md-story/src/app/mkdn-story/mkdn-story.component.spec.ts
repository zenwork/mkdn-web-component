import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MkdnStoryComponent} from './mkdn-story.component';

describe('MkdnStoryComponent', () => {
    let component: MkdnStoryComponent;
    let fixture: ComponentFixture<MkdnStoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MkdnStoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MkdnStoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
