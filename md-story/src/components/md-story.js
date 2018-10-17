import * as logger from './logger.js';
import {LitElement,html} from '@polymer/lit-element/lit-element.js';

export default class MdStory extends LitElement {

	static get properties() {
		return {
			markdown:{type:String}
		};
	}

	constructor() {
		super();
		this.markdown = 'no markdown provided';
	}

	render() {
		return html`<section id="story" class="story">${this.markdown}</section>`
	}
}

window.customElements.define('md-story', MdStory);
