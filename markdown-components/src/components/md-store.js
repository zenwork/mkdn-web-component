import { html } from '@polymer/lit-element/lit-element.js';
import { ChildElement } from '../shared/child-element';
import { dispatchIndexUpdate, dispatchStory, listenForSelection } from '../shared/events';
import { Story } from '../shared/story';

export class MdStore extends ChildElement {

	static get name() { return 'md-store';}

	static get properties() {
		return {
			src:{type:String},
			stories:{type:String}
		};
	}

	connectedCallback() {
		let state = this.joinParent('md-view');
		if (state === 'standalone') {
			throw Error('md-static-store can not work in standalone mode');
		}
	}

	onAccepted(parent) {
		this.index = {};
		this.updateIndex(this.index, this);
		this.fetch(this, this.src, (root, rawJson) => {root.updateIndex(JSON.parse(rawJson), root);});
		this.ready();
	}

	onSiblingReady(sibling) {
		const that = this;
		switch (sibling.Class) {
			case 'md-list':
				listenForSelection(sibling, (event) => {
					this.fetch(that,
					           that.stories + event.detail.key + '.md',
					           (root, story) => {root.addToStore(event.detail, story, root);});
				});
				break;
		}
	}

	fetch(root, url, handleResponseFn) {
		const xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = () => {

			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				handleResponseFn(root, xmlhttp.responseText);
			}
		};
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	}

	render() {
		return html``;
	}

	addToStore(def, story, root) {
		let newDef = new Story(def.key, def.title);
		newDef.content = story;
		root.story = newDef;
		// console.log(JSON.stringify(root.story));
		dispatchStory(root, root.story);
	}

	updateIndex(value, root) {
		root.shadowRoot.value = root.index = value;
		if (Object.keys(root.index).length > 0) {
			dispatchIndexUpdate(root, root.index);
		}
	}
}

MdStore.define('md-store');
