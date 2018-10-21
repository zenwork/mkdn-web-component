import { html } from '@polymer/lit-element/lit-element.js';

import { BaseElement } from '../shared/base-element';
import { MdStaticStore } from './md-static-store';
import { MdStore } from './md-store';
import { dispatchEventMode,dispatchStartEvents } from '../shared/events';

MdStaticStore.define();
MdStore.define();

export class MdView extends BaseElement {

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
		super.connectedCallback();
		this.init(this);
		this.listenToStoreUpdates(this);
		this.listenToSelectionChanges(this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html`<slot></slot>`;
	}

	init(root) {
		
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


	listenToSelectionChanges(root) {

		this.list.addEventListener('md-list-selected',
		                           function (e) {
			                           // root.stories.forEach((story) => {
				                       //     if (story.key === e.detail.key) {
					                   //         root.story.innerHTML = story.content;
				                       //     }
			                           // });
		                           });
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
