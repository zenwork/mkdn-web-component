import { html } from '@polymer/lit-element/lit-element.js';

import { BaseElement } from '../shared/base-element';
import {
	dispatchIndexUpdate,
	dispatchStory,
	listenForSelection,
	observeContentChange,
	setupEventMode
} from '../shared/events';
import { Story } from '../shared/story';

export class MdStaticStore extends BaseElement {

	static get name() { return 'md-static-store';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		this.init();
		this.observeContentChange();
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	render() {
		return html``;
	}

	init() {
		this.store = [];
		this.shadowRoot.store = this.store;
		if (this.innerHTML) {
			this.updateStore(this.innerHTML, this);
		}
		const that = this;
		setupEventMode(this, null, () => {
			listenForSelection(event.detail.list, (event) => {
				let key = event.detail.key;
				let title = event.detail.title;
				let content = that.findContent(that, key);
				dispatchStory(that, new Story(key, title, content));
			});
			dispatchIndexUpdate(this, this.index);
		});
	}

	updateStore(input, root) {
		root.updateStories(root, input);
		root.updateIndex(root);
	}

	/**
	 * needs fixing/changing
	 * @param root
	 * @param input
	 */
	updateStories(root, input) {
		root.store = JSON.parse(input.trim());
		root.shadowRoot.store = root.store;
		let event = new CustomEvent('md-store-updated');
		root.dispatchEvent(event);
	}

	/**
	 * New good way of doing things
	 * @param root
	 */
	updateIndex(root) {
		let index = {};
		root.store.forEach((item) => {index[item.key] = item.title;});
		root.index = index;
		dispatchIndexUpdate(root, root.index);
	}

	observeContentChange() {
		observeContentChange('MD-STATIC-STORE', this.updateStore, this);
	}

	findContent(root, key) {
		let result = root.store.filter((story) => story.key === key);
		return result[0].content;
	}
}

MdStaticStore.define();
