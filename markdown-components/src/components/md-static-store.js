import { html } from '@polymer/lit-element/lit-element.js';
import { ChildElement } from '../shared/child-element';
import { dispatchIndexUpdate, dispatchStory, listenForSelection, observeContentChange } from '../shared/events';
import { StoreOperations } from '../shared/store';
import { clone } from '../shared/util';

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
			case 'md-list':
				const that = this;
				listenForSelection(sibling, (event) => {
					let key = event.detail.url;
					let story = StoreOperations.findStory(that.store.stories, key);
					dispatchStory(that, story);
				});

				if (this.innerHTML) {
					this.updateStore(this.innerHTML, this);
				}

				break;
		}
	}

	updateStore(input, root) {
		root.store = StoreOperations.transformIndex(input.trim());
		root.shadowRoot.store = root.store;
		let event = new CustomEvent('md-store-updated');
		root.dispatchEvent(event);
		dispatchIndexUpdate(root, clone(root.store));
	}

	render() {
		return html``;
	}
}

MdStaticStore.define();
