import { html } from '@polymer/lit-element/lit-element.js';

import { BaseElement } from '../shared/base-element';
import { MdStaticStore } from './md-static-store';

MdStaticStore.define();

export class MdView extends BaseElement {

	static get name() { return 'md-view';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		this.init();
		this.listenToStoreUpdates(this);
		this.listenToSelectionChanges(this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html`<slot></slot>`;
	}

	init() {
		this.store = this.querySelector('md-static-store');
		this.list = this.querySelector('md-list');
		this.story = this.querySelector('md-story');
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
			                           root.stories.forEach((story) => {
				                           if (story.key === e.detail.key) {
					                           root.story.innerHTML = story.content;
				                           }
			                           });
		                           });
	}

	updateStories(root) {
		if (root.store.shadowRoot) {
			root.stories = root.store.shadowRoot.store;
			let links = {};
			root.stories.forEach((story) => links[story.key] = story.title);
			root.list.innerHTML = JSON.stringify(links);
		}
	}
}

MdView.define();
