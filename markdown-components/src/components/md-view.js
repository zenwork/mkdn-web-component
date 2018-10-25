import { html } from '@polymer/lit-element/lit-element.js';
import { dispatchEventMode, dispatchStartEvents } from '../shared/events';
import { ParentElement } from '../shared/parent-element';
import { MdStaticStore } from './md-static-store';
import { MdStore } from './md-store';

MdStaticStore.define();
MdStore.define();

export class MdView extends ParentElement {

	static get name() { return 'md-view';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	constructor() {
		super();
		this.setRoot(this);
	}

	connectedCallback() {
		this.initParent();
		this.initt(this);
		this.listenToStoreUpdates(this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html`<slot></slot>`;
	}

	initt(root) {
		
		if (this.$('md-static-store')) {
			root.shadowRoot.store = root.store = this.$('md-static-store');
		} else if (this.$('md-store')) {
			root.shadowRoot.store = root.store = this.$('md-store');
		} else {
			root.shadowRoot.store = root.store = null;
		}


		if (this.$('md-list')) root.shadowRoot.list = root.list = this.$('md-list');

		if (this.$('md-story')) root.shadowRoot.story = root.story = this.$('md-story');

		dispatchEventMode(root);
		dispatchStartEvents(root);

	}



	listenToStoreUpdates(root) {
		if (root.store && root.list) {
			root.updateStories(root);
			root.store.addEventListener('md-store-updated', () => {root.updateStories(root);});
		}
	}




	updateStories(root) {
		if (root.store.shadowRoot) {
			root.stories = root.store.shadowRoot.store;
			let links = {};
			if(root.stories) root.stories.forEach((story) => links[story.key] = story.title);
			// root.list.innerHTML = JSON.stringify(links);
		}
	}
}

MdView.define();
