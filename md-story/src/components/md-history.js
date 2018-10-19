import {html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat';
import {BaseElement} from './base-element';
import {observeContentChange} from './events';
import {Story} from './story';

export default class MdHistory extends BaseElement {
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

			                                     this.inputList = JSON.parse(mut.target.innerHTML.trim());
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
				return repeat(Object.keys(inputList),
				              (key) => {return key;},
				              (key) => {return itemTemplate(key);});
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

