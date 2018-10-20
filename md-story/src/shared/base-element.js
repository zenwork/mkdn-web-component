import {html, LitElement} from '@polymer/lit-element/lit-element.js';

export class BaseElement extends LitElement {

	constructor(){
		super();
	}

	static define(name){
		const Class = this;
		if(name){
			window.customElements.define(name, Class);
		} else if(this.name){
			window.customElements.define(this.name, Class);
		} else{
			throw Error('either define [static this.name] or provide a valid name to the define(name) function')
		}
	}

	createRenderRoot() {
		//should use a 'closed' shadow dom but must be open for testing!!! Need to figure this out
		return this.attachShadow({mode:'open'});
	}
}
