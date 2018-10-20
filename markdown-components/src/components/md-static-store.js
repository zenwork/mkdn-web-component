import {html} from '@polymer/lit-element/lit-element.js';

import {BaseElement} from '../shared/base-element';
import {observeContentChange} from '../shared/events';

export class MdStaticStore extends BaseElement {

	static get name() { return 'md-static-store';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		this.init();
		this.observeContentChange();
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html``;
	}

	init() {
		this.store = [];
		this.shadowRoot.store = this.store;
		if (this.innerHTML) {
			this.updateStore(this.innerHTML, this);
		} 
	}

	updateStore(input, root) {
		root.store = JSON.parse(input.trim());
		root.shadowRoot.store = root.store;
		let event = new CustomEvent('md-store-updated');
		root.dispatchEvent(event);
	}

	observeContentChange() {
		observeContentChange('MD-STATIC-STORE', this.updateStore, this);
	}
}

MdStaticStore.define();
