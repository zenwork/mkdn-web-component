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

	createRenderRoot() {
		//should use a closed shadow dom but must be open for testing!!! Need to figure this out
		return this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		let markdown = this.innerHTML;
		if (markdown && !this.hidden) {
			this.markdown.innerHTML = marked(markdown);
		}

		// Options for the observer (which mutations to observe)
		let config = { attributes: false, childList: true, subtree: false };
		const that = this;
		this.observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation) {
				if (mutation.type === 'childList' && mutation.target.nodeName === 'MD-STORY') {
				  console.log(mutation);
					that.markdown.innerHTML = marked(mutation.target.innerHTML);
				}
			});
		});

		// Start observing the target node for configured mutations
		this.observer.observe(this, config);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	updated(changedProperties) {
		console.log("updated")
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
