import {html} from '@polymer/lit-element/lit-element.js';

import {BaseElement} from './base-element';
import {observeContentChange} from './events';

export default class MdStaticStore extends BaseElement {

	static get name() { return 'md-static-store';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {

		if (this.innerHTML) {
			this.store = JSON.parse(this.innerHTML.trim());
			this.shadowRoot.store = this.store;
		} else {
			this.store = [];
		}

		observeContentChange('MD-STATIC-STORE',
		                     (mut) => {
			                     let input = mut.target.innerHTML;
			                     try {
				                     if (input) {
				                     	this.store = JSON.parse(input.trim());
				                     	let event = new CustomEvent('md-store-updated');
				                     	this.dispatchEvent(event);
				                     }
			                     } catch (e) {
				                     throw e;
			                     }
		                     },
		                     this);

	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html``;
	}
}

MdStaticStore.define();
