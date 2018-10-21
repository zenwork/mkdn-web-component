import { LitElement } from '@polymer/lit-element/lit-element.js';

export class BaseElement extends LitElement {

	constructor() {
		super();
		this.Class = new.target.name;
		// console.debug(`constructing: ${this.Class}`);
		if (new.target === BaseElement) {
			throw new TypeError('Cannot construct BaseElement instances directly');
		}

	}

	connectedCallback() {
		// console.debug(`connected: ${this.Class}`);
	}

	setRoot(root) {
		this.root = root;
	}

	$(selector) {
		return this.root.querySelector(selector);
	}

	static define(name) {
		try {
			const Class = this;
			if (name) {
				window.customElements.define(name, Class);
			} else if (this.name) {
				window.customElements.define(this.name, Class);
			} else {
				throw Error('either define [static this.name] or provide a valid name to the define(name) function');
			}
		} catch (e) {
			console.debug(`swallowing custom component define() for [${name?name:this.name}] error: ${e.message}`);
		}
	}

	createRenderRoot() {
		//should use a 'closed' shadow dom but must be open for testing!!! Need to figure this out
		return this.attachShadow({mode:'open'});
	}
}
