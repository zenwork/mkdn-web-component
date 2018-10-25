import { html } from '@polymer/lit-element/lit-element.js';
import * as marked from 'marked';
import { ChildElement } from '../shared/child-element';
import { listenForStory, observeContentChange } from '../shared/events';

/**
 * Web Component that formats and displays a markdown story. Reads markdown from the component elements content.
 * supports 'hidden' boolean/flag attribute and the canonical style attribute for injecting css.
 */
export class MdStory extends ChildElement {
	static get name() { return 'md-story';}

	static get properties() {
		return {
			markdown:{type:String, attribute:false},
			style:{type:String},
			hidden:{type:Boolean}
		};
	}

	connectedCallback() {
		this.marked = marked;
		this.markdown = document.createElement('div');
		this.formatStory('no markdown provided', this);
		this.joinParent('md-view');
	}

	initStandalone() {
		let input = this.innerHTML;
		if (input && !this.hidden) {this.formatStory(input, this);}
		this.observer = observeContentChange('MD-STORY', this.formatStory, this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	onSiblingReady(sibling) {
		switch (sibling.Class) {
			case 'md-store':
			case 'md-static-store':
				listenForStory(sibling,
				               (storyEvent) => {
					               this.formatStory(storyEvent.detail.content, this);
				               });
				super.ready();
				break;
		}
	}

	render() {
		if (this.hidden && this.hidden !== null) {
			return html``;
		} else {
			return html`<section style="${this.style}" class="story"> 
${this.markdown}
</section>`;
		}
	}

	formatStory(markdown, root) {
		root.markdown.innerHTML = root.marked(markdown);
	}
}

MdStory.define();
