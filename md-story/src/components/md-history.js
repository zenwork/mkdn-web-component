import {html, LitElement} from '@polymer/lit-element/lit-element.js';

export default class MdHistory extends LitElement {

	static get name() { return 'md-history';}

	constructor(){
		super();
	}
	
	render(){
		return html`<section><p>no history</p></section>`
	}
}

window.customElements.define(MdHistory.name, MdHistory);

