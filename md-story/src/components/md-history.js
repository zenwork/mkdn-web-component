import {html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat';
import {BaseElement} from './base-element';
import {observeContent} from './util';

export default class MdHistory extends BaseElement {

	static get name() { return 'md-history';}

	static get properties() {
		return {
			inputList:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		let input = this.innerHTML.trim();
		if (input) {
			this.inputList = JSON.parse(input);
		}
		else {
			this.inputList = {na:'no history'};
		}

		this.observer = observeContent('MD-HISTORY',
		                               (mut) => {

			                               this.inputList = JSON.parse(mut.target.innerHTML.trim());
		                               }, this);

	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html` <section><ul> 
			${repeat(Object.keys(this.inputList),
		             (key) => {return key;},
		             (key) => { return html`<li><button @click=${(key) => { console.log(key); }}>${this.inputList[key]}</button></li>`;})}
</ul></section>`;

	}
}

MdHistory.define();

