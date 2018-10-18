import {html, LitElement} from '@polymer/lit-element/lit-element.js';
import * as marked from 'marked';

/**
 * Web Component that formats and displays a markdown story. Reads markdown from the component elements content.
 * supports 'hidden' boolean/flag attribute and the canonical style attribute for injecting css.
 */
export default class MdStory extends LitElement {

	static get name() { return 'md-story';}

	static get properties() {
		return {
			markdown:{type:String, attribute:false},
			style:{type:String},
			hidden:{type:Boolean}
		};
	}

	constructor() {
		super();
		this.markdown = document.createElement('div');
		this.markdown.innerHTML = '<p>no markdown provided</p>';
	}

	connectedCallback() {
		let markdown = this.innerHTML;
		if (markdown && !this.hidden) {
			this.markdown.innerHTML = marked(markdown);
		}
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

window.customElements.define(MdStory.name, MdStory);
