import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { ChildElement } from './child-element';
import { ParentElement } from './parent-element';

/**
 * This is only used for testing to initialise the child and parent elements for testing purpose
 */

export class TestChild extends ChildElement {

	static get name() {return 'md-child';}

	static get properties() {
		return {
			relationship:{type:String},
			messages:{type:Array}
		};
	}

	constructor() {
		super();
		this.relationship = '';
		this.messages = [];

	}

	connectedCallback() {
		super.connectedCallback();
		this.shadowRoot.Id = this.Id;
		this.shadowRoot.Class = this.Class;

	}

	cooperative() {
		// console.log('cooperative init');

	}

	onJoinAccepted(parent) {
		this.relationship = `READY: ${parent.Class}:${parent.Id} -> ${this.Class}:${this.getAttribute('id')
		                                                                            ? this.getAttribute('id')
		                                                                            : this.Id}`;
		this.ready();
	}

	onJoinerReady(sibling) {
		this.messages.push(`sibling READY: ${sibling.Class}:${sibling.getAttribute('id')
		                                                      ? sibling.getAttribute('id')
		                                                      : sibling.Id}`);
	}

	render() {
		return html`
				<h3>union:</h3>
				<p>${this.relationship}</p>
				<h3>siblings:</h3>
				<ul>
				${repeat(this.messages,
		                 (item) => item,
		                 (item) => html`<li>${item}</li>`)}
				</ul>
			       `;
	}
}

/**
 *  Test Parent
 */
export class TestParent extends ParentElement {
	static get name() {return 'md-parent';}

	static get properties() { return {ready:Boolean, attribute:false};}

	connectedCallback() {
		this.ready = true;
		this.init();
	}

	render() {
		return html`<slot></slot>`;
	}
}

TestChild.define('md-child');
TestParent.define('md-parent');
