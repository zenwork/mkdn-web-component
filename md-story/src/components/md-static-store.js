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
			this.updateStore(this.innerHTML);
		} else {
			this.store = [];
		}

		observeContentChange('MD-STATIC-STORE',
		                     (mut) => {
			                     let input = mut.target.innerHTML;
			                     try {
				                     if (input) {
					                     this.updateStore(input);
				                     }
			                     } catch (e) {
				                     throw e;
			                     }
		                     },
		                     this);

	}

	updateStore(input) {
		this.store = JSON.parse(input.trim());
		this.shadowRoot.store = this.store;
		let event = new CustomEvent('md-store-updated');
		this.dispatchEvent(event);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html``;
	}
}

MdStaticStore.define();
