import {html, LitElement} from '@polymer/lit-element/lit-element.js';
import * as marked from 'marked';

export default class MdStory extends LitElement {

	static get properties() {
		return {
			markdown:{type:String, attribute:false}
		};
	}

	static get name() { return 'md-story';}

	constructor() {
		super();
		this.markdown = document.createElement('div');
		this.markdown.innerHTML = '<p>no markdown provided</p>';
	}

	connectedCallback() {
		let markdown = this.innerHTML;
		if (markdown) {
			this.markdown.innerHTML = marked(markdown);
		}
	}

	render() {
		return html`
<section class="story">
    ${this.markdown}
</section>`;
	}
}

window.customElements.define(MdStory.name, MdStory);
