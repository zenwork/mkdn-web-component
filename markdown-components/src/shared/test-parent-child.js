import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { ChildElement } from './child-element';
import { ParentElement } from './parent-element';

/**
 * This is only used for testing to initialise the child and parent elements for testing purpose
 */

export class TestChild extends ChildElement {

	static get name() {return 'md-child';}

	constructor() {
		super();
		this.relationship = '';
		this.messages = {};

	}

	static get properties() {
		return {
			relationship:{type:String, attribute:false},
			messages:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this.shadowRoot.Id = this.Id;
		this.shadowRoot.Class = this.Class;

	}

	onAccepted(parent) {
		this.relationship = `READY: ${parent.Class}:${parent.Id} -> ${this.Class}:${this.getAttribute('id')
		                                                                            ? this.getAttribute('id')
		                                                                            : this.Id}`;
		this.ready();
	}

	onSiblingReady(sibling) {
		this.messages[sibling.hashcode()] = `sibling READY: ${sibling.Class}:${sibling.getAttribute('id')
		                                                                       ? sibling.getAttribute('id')
		                                                                       : sibling.Id}`;

		this.messages = {...this.messages};
	}

	onJoinerLeaving(sibling) {
		delete this.messages[sibling.hashcode()];
		this.messages = {...this.messages};
	}

	render() {
		return html`
				<h3>union:</h3>
				<p>${this.relationship}</p>
				<h3>siblings:</h3>
				<ul>
				${repeat(Object.keys(this.messages),
		                 (key) => key,
		                 (key) => html`<li>${this.messages[key]}</li>`)}
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
		this.initParent();
	}

	render() {
		return html`<slot></slot>`;
	}
}

TestChild.define('md-child');
TestParent.define('md-parent');
