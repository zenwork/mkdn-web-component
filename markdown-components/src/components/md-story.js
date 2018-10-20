import {html} from '@polymer/lit-element/lit-element.js';
import * as marked from 'marked';
import {observeContentChange} from '../shared/events';
import {BaseElement} from '../shared/base-element';

/**
 * Web Component that formats and displays a markdown story. Reads markdown from the component elements content.
 * supports 'hidden' boolean/flag attribute and the canonical style attribute for injecting css.
 */
export class MdStory extends BaseElement {
	static get name() { return 'md-story';}

	static get properties() {
		return {
			markdown:{type:String, attribute:false},
			style:{type:String},
			hidden:{type:Boolean}
		};
	}

	connectedCallback() {
		this.init();
		this.observeMarkdownChanges();
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	init() {
		this.marked = marked;
		this.markdown = document.createElement('div');
		this.formatStory('no markdown provided', this);

		let input = this.innerHTML;
		if (input && !this.hidden) {this.formatStory(input, this);}
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

	observeMarkdownChanges() {
		this.observer = observeContentChange('MD-STORY', this.formatStory, this);
	}

	formatStory(markdown,root) {
		root.markdown.innerHTML = root.marked(markdown);
	}
}

MdStory.define();
