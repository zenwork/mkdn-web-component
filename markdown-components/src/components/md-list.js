import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { BaseElement } from '../shared/base-element';
import { dispatchSelection, listenForIndexUpdate, observeContentChange, setupEventMode } from '../shared/events';
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

	static updateList(input, root) {
		root.inputList = JSON.parse(input.trim());
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	connectedCallback() {
		this.init();
		this.observer = observeContentChange('MD-LIST', MdList.updateList, this);
	}

	render() {
		let itemTemplate = (key) => html`<li><a href="#" @click=${() => {
			this.select(this, key);
		}}>${this.inputList[key]}</a></li>`;

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
		let onStart = (event) => {

			let store = event.detail.shadowRoot.store;
			if (store) {
				const onIndexUpdate = (event) => {
					return this.inputList = event.detail;
				};
				listenForIndexUpdate(store, onIndexUpdate);
			}
		};

		setupEventMode(this, null, onStart);

		if (this.innerHTML) {
			MdList.updateList(this.innerHTML, this);
		} else {
			this.inputList = this.empty;
		}
	}

	select(root, key) {
		dispatchSelection(root, new Story(key, this.inputList[key]));
	}
}

MdList.define();

