import { html } from '@polymer/lit-element/lit-element.js';
import { ChildElement } from '../shared/child-element';
import { dispatchIndexUpdate, dispatchStory, listenForSelection, observeContentChange } from '../shared/events';
import { Story } from '../shared/story';

export class MdStaticStore extends ChildElement {

	static get name() { return 'md-static-store';}

	static get properties() {
		return {
			store:{type:Object, attribute:false}
		};
	}

	connectedCallback() {
		let state = this.joinParent('md-view');
		if (state === 'standalone') {
			throw Error('md-static-store can not work in standalone mode');
		}
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	onAccepted(parent) {
		this.store = [];
		this.shadowRoot.store = this.store;
		observeContentChange('MD-STATIC-STORE', this.updateStore, this);
		dispatchIndexUpdate(this, this.index);
		super.ready();
	}

	onSiblingReady(sibling) {
		switch (sibling.Class) {
			case 'md-story':
				// console.log(`${this.hashcode()} >> md-story`);
				break;
			case 'md-list':
				const that = this;
				listenForSelection(sibling, (event) => {
					let key = event.detail.key;
					let title = event.detail.title;
					let content = that.findContent(that, key);
					dispatchStory(that, new Story(key, title, content));
				});

				if (this.innerHTML) {
					this.updateStore(this.innerHTML, this);
				}

				break;
		}
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

	findContent(root, key) {
		let result = root.store.filter((story) => story.key === key);
		return result[0].content;
	}

	render() {
		return html``;
	}
}

MdStaticStore.define();
