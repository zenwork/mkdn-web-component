import {html} from '@polymer/lit-element/lit-element.js';

import {BaseElement} from './base-element';
import {MdStaticStore} from './md-static-store';

export default class MdBackend extends BaseElement {

	static get name() { return 'md-backend';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {

		this.store = this.querySelector('md-static-store');
		this.history = this.querySelector('md-history');
		this.story = this.querySelector('md-story');

		if (this.store && this.history) {
			this.updateStories();
			this.store.addEventListener('md-store-updated', () => {this.updateStories();});
		}
		let that = this;
		this.history.addEventListener('md-history-selected',
		                              function (e) {
			                              that.stories.forEach((story) => {
				                              if (story.key === e.detail.key) {
					                              that.story.innerHTML = story.content;
				                              }
			                              });
		                              });
	}

	updateStories() {
		this.stories = this.store.shadowRoot.store;
		let links = {};
		this.stories.forEach((story) => links[story.key] = story.title);
		this.history.innerHTML = JSON.stringify(links);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html`<slot></slot>`;
	}
}

MdBackend.define();
