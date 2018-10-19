import {html} from '@polymer/lit-element/lit-element.js';
import * as marked from 'marked';
import {observeContentChange} from './events';
import {BaseElement} from './base-element';

/**
 * Web Component that formats and displays a markdown story. Reads markdown from the component elements content.
 * supports 'hidden' boolean/flag attribute and the canonical style attribute for injecting css.
 */
export default class MdStory extends BaseElement {
	static get name() { return 'md-story';}

	static get properties() {
		return {
			markdown:{type:String, attribute:false},
			style:{type:String},
			hidden:{type:Boolean}
		};
	}

	connectedCallback() {
		this.markdown = document.createElement('div');
		this.formatStory('no markdown provided');

		let input = this.innerHTML;
		if (input && !this.hidden) {this.formatStory(input);}

		const that = this;
		this.observer = observeContentChange('MD-STORY', mutation => that.formatStory(mutation.target.innerHTML), this);
	}

	formatStory(markdown) {
		this.markdown.innerHTML = marked(markdown);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		if (this.hidden && this.hidden !== null) {
			return html``;
		} else {
			return html`
<section style="${this.style}" class="story">
    ${this.markdown}
</section>`;
		}
	}
}

MdStory.define();
