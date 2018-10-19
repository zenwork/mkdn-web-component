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
		console.log(`input ${input}`);
		if (input) {
			this.inputList = JSON.parse(input);
		}
		else {
			this.inputList = {na:'no history'};
		}

		this.observer = observeContent(this.name,
		                               (mut) => {
			                               this.inputList = JSON.parse(mut.innerHTML);
		                               }, this);

	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html` <section><ul> 
			${repeat(Object.keys(this.inputList),
		             (key) => {return key;},
		             (key) => { return html`<li><button @click=${key}>${this.inputList[key]}</button></li>`;})}
</ul></section>`;

	}
}

MdHistory.define();

