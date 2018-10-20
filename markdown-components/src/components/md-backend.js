import {html} from '@polymer/lit-element/lit-element.js';

import {BaseElement} from '../shared/base-element';

//do not remove importing it so that component gets defined
import {MdStaticStore} from './md-static-store';

export class MdBackend extends BaseElement {

	static get name() { return 'md-backend';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {

		this.store = this.querySelector('md-static-store');
		this.list = this.querySelector('md-list');
		this.story = this.querySelector('md-story');

		if (this.store && this.list) {
			this.updateStories();
			this.store.addEventListener('md-store-updated', () => {this.updateStories();});
		}
		let that = this;
		this.list.addEventListener('md-list-selected',
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
		this.list.innerHTML = JSON.stringify(links);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html`<slot></slot>`;
	}
}

MdBackend.define();
