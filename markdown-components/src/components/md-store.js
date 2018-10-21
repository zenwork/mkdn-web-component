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
		xmlhttp.onreadystatechange = function () {

			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				that.updateIndex(JSON.parse(xmlhttp.responseText),this);
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
		this.updateIndex({});
		// setupEventMode(this,null,()=>{
		// 	dispatchIndexUpdate(this,this.index)
		// });
	}

	updateIndex(value, root) {
		this.shadowRoot.value = this.index = value;
		if(Object.keys(this.index).length >0){
			let event = new CustomEvent('md-store-index-updated');
			root.dispatchEvent(event,{detail:this.index});
		}
	}
}

MdStore.define('md-store');
