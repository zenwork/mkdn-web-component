import {html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat';
import {BaseElement} from '../shared/base-element';
import {observeContentChange} from '../shared/events';
import {Story} from '../shared/story';

export class MdHistory extends BaseElement {
	constructor() {
		super();
		this.empty = {};
	}

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
		} else {
			this.inputList = this.empty;
		}

		this.observer = observeContentChange('MD-HISTORY',
		                                     (mut) => {
			                                     let input = mut.target.innerHTML;
			                                     try {
				                                     if (input) { this.inputList = JSON.parse(input.trim());}
			                                     } catch (e) {
				                                     console.log(`invalid history: ${input}`);
				                                     throw e;
			                                     }
		                                     },
		                                     this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		let itemTemplate = (key) => html`<li><a href="#" @click=${() => { this.select(key); }}>${this.inputList[key]}</a></li>`;

		function renderItems(inputList, empty) {
			if (inputList === empty) {
				return html`<li>no items</li>`;
			} else {
				return html`${repeat(Object.keys(inputList),
				                     (key) => {return key;},
				                     (key) => {return itemTemplate(key);})}`;
			}
		}

		return html` <section><ul>${renderItems(this.inputList, this.empty)}</ul></section>`;

	}

	select(key) {
		let storyDef = new Story(key, this.inputList[key]);
		let event = new CustomEvent('md-history-selected', {detail:storyDef});
		this.dispatchEvent(event);
	}
}

MdHistory.define();

