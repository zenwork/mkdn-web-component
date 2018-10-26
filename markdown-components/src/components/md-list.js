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

	connectedCallback() {
		this.inputList = this.empty;
		super.joinParent('md-view');
	}

	disconnectedCallback() {
		if (this.observer) this.observer.disconnect();
	}

	initStandalone() {
		if (this.innerHTML) {
			updateList(this.innerHTML, this);
		}
		this.observer = observeContentChange('MD-LIST', updateList, this);

		function updateList(input, root) {
			root.inputList = JSON.parse(input.trim());
		}

	}

	onSiblingReady(sibling) {
		switch (sibling.Class) {
			case 'md-store':
			case 'md-static-store':
				listenForIndexUpdate(sibling,
				                     (event) => {
					                     return this.inputList = event.detail;
				                     });
				super.ready();
				break;
		}
	}

	render() {
		let itemTemplate = (key) => html`<li><button class="link" @click=${() => {
			this.select(this, key);
		}}>${this.inputList[key]}</button></li>`;

		function renderItems(inputList, empty) {
			if (inputList === empty) {
				return html`<li>no items</li>`;
			} else {
				return html`${repeat(Object.keys(inputList),
				                     (key) => {return key;},
				                     (key) => {return itemTemplate(key);})}`;
			}
		}

		return html` 
 		<style>
	    button {
		    overflow: visible;
		    width: auto;
		}
		button.link {
		    font-family: sans-serif;
		    font-size: 1em;
		    text-align: left;
		    color: blue;
		    background: none;
		    margin: 0;
		    padding: 0;
		    border: none;
		    cursor: pointer;
		   
		    -moz-user-select: text;
		 
		    /* override all your button styles here if there are any others */
		}
		button.link span {
		    text-decoration: underline;
		}
		button.link:hover span,
		button.link:focus span {
		    color: black;
		}
		</style>
 		<section><ul>${renderItems(this.inputList, this.empty)}</ul></section>`;

	}

	select(root, key) {
		dispatchSelection(root, new Story(key, this.inputList[key]));
	}
}

MdList.define();

