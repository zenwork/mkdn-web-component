import { html } from '@polymer/lit-element/lit-element.js';

import { BaseElement } from '../shared/base-element';
import { dispatchIndexUpdate, setupEventMode } from '../shared/events';

export class MdStore extends BaseElement {

	static get name() { return 'md-store';}

	static get properties() {
		return {
			src:{type:String},
			stories:{type:String}
		};
	}

	connectedCallback() {
		this.init();
		var xmlhttp = new XMLHttpRequest();
		const that = this;
		xmlhttp.onreadystatechange = () => {

			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				that.updateIndex(JSON.parse(xmlhttp.responseText), that);
			}
		};
		xmlhttp.open('GET', this.src, true);
		xmlhttp.send();
	}

	disconnectedCallback() {
	}

	render() {
		return html``;
	}

	shouldUpdate(changedProperties) {
		console.debug('should update');
		return true;
	}

	update(changedProperties) {
		console.debug('update');
	}

	firstUpdated(changedProperties) {
		console.debug('first update');
	}

	updated(changedProperties) {
		console.debug('updated');
	}

	init() {
		this.index = {};
		this.updateIndex(this.index,this);
		setupEventMode(this, null, () => {
			dispatchIndexUpdate(this, this.index);
		});
	}

	updateIndex(value, root) {
		root.shadowRoot.value = root.index = value;
		if (Object.keys(root.index).length > 0) {
			dispatchIndexUpdate(root, root.index);
		}
	}
}

MdStore.define('md-store');
