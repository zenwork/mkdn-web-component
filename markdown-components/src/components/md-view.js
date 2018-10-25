import { html } from '@polymer/lit-element/lit-element.js';
import { ParentElement } from '../shared/parent-element';
import { MdStaticStore } from './md-static-store';
import { MdStore } from './md-store';

MdStaticStore.define();
MdStore.define();

export class MdView extends ParentElement {

	static get name() { return 'md-view';}

	static get properties() {
		return {
			joiners:{type:Object, attribute:false}
		};
	}

	joinerReady(source) {
		super.joinerReady(source);
		//trigger re-render
		this.joiners = {...this.joiners};
	}

	render() {
		return html`<slot></slot>`;
	}

}

MdView.define();
