import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { BaseElement } from '../shared/base-element';
import { observeContentChange } from '../shared/events';
import { Story } from '../shared/story';

export class MdList extends BaseElement {

	static get name() { return 'md-list';}

	static get properties() {
		return {
			inputList:{type:Object, attribute:false}
		};
	}

	constructor() {
		super();
		this.empty = {};
	}

	connectedCallback() {
		this.init();
		this.observer = observeContentChange('MD-LIST', this.updateList, this);
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

	init() {
		if (this.innerHTML) {
			this.updateList(this.innerHTML, this);
		} else {
			this.inputList = this.empty;
		}
	}

	updateList(input, root) {
		root.inputList = JSON.parse(input.trim());
	}

	select(key) {
		let storyDef = new Story(key, this.inputList[key]);
		let event = new CustomEvent('md-list-selected', {detail:storyDef});
		this.dispatchEvent(event);
	}
}

MdList.define();

