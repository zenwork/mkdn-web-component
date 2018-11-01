import { html } from '@polymer/lit-element/lit-element.js';
import { ParentElement } from '../shared/parent-element';
import { MkdnStaticStore } from './mkdn-static-store';
import { MkdnStore } from './mkdn-store';

MkdnStaticStore.define();
MkdnStore.define();

export class MkdnView extends ParentElement {

	static get name() { return 'mkdn-view';}

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

MkdnView.define();
