import {html, LitElement} from '@polymer/lit-element/lit-element.js';

export default class MdStory extends LitElement {

	static get properties() {
		return {
			markdown:{type:String}
		};
	}

	static get name() { return 'md-story';}

	constructor() {
		super();
		this.markdown = '';
	}

	render() {
		return html`<section class="story">
    <slot>no markdown provided</slot>
</section>`;
	}
}

window.customElements.define(MdStory.name, MdStory);
