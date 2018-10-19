import {html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat';
import {BaseElement} from './base-element';
import {observeContentChange} from './events';
import {Story} from './story';

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

		this.observer = observeContentChange('MD-HISTORY',
		                                     (mut) => {

			                                     this.inputList = JSON.parse(mut.target.innerHTML.trim());
		                                     },
		                                     this);

	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	select(key) {
		console.log(key);
		let storyDef = new Story(key, this.inputList[key]);
		let event = new CustomEvent('md-history-selected', {detail:storyDef});
		this.dispatchEvent(event);
	}

	render() {
		return html` <section><ul> 
			${repeat(Object.keys(this.inputList),
		             (key) => {return key;},
		             (key) => { return html`<li><a href="#" @click=${(event) => { this.select(key); }}>${this.inputList[key]}</a></li>`;})}
</ul></section>`;

	}
}

MdHistory.define();

