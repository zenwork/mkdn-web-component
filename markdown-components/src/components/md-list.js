import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { ChildElement } from '../shared/child-element';
import { dispatchSelection, listenForIndexUpdate, observeContentChange } from '../shared/events';
import { Story } from '../shared/story';

export class MdList extends ChildElement {

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

	connectedCallback() {
		this.inputList = this.empty;
		super.joinParent('md-view');
	}

	disconnectedCallback() {
		if (this.observer) this.observer.disconnect();
	}

	beforeStandalone() {
		if (this.innerHTML) {
			MdList.updateList(this.innerHTML, this);
		}
		this.observer = observeContentChange('MD-LIST', this.updateList, this);
	}

	onSiblingReady(sibling) {
		switch (sibling.Class) {
			case 'md-store':
			case 'md-static-store':
				console.log(`LL: ${this.hashcode()} >> store`);
				listenForIndexUpdate(sibling,
				                     (event) => {
					                     return this.inputList = event.detail;
				                     });
				super.ready();
				break;
		}
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

	select(root, key) {
		dispatchSelection(root, new Story(key, this.inputList[key]));
	}
}

MdList.define();

