import { html } from '@polymer/lit-element/lit-element.js';

import { BaseElement } from '../shared/base-element';
import { dispatchIndexUpdate, dispatchStory, listenForSelection, setupEventMode } from '../shared/events';
import { Story } from '../shared/story';

export class MdStore extends BaseElement {

	static get name() { return 'md-store';}

	static get properties() {
		return {
			src:{type:String},
			stories:{type:String}
		};
	}

	connectedCallback() {
		this.init();
		this.fetch(this, this.src, (root, rawJson) => {root.updateIndex(JSON.parse(rawJson), root);});
	}

	fetch(root, url, handleResponseFn) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = () => {

			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				handleResponseFn(root, xmlhttp.responseText);
			}
		};
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	}

	disconnectedCallback() {
	}

	render() {
		return html``;
	}

	shouldUpdate(changedProperties) {
		console.debug('should update');
		return true;
	}

	update(changedProperties) {
		console.debug('update');
	}

	firstUpdated(changedProperties) {
		console.debug('first update');
	}

	updated(changedProperties) {
		console.debug('updated');
	}

	init() {
		this.index = {};
		this.updateIndex(this.index, this);
		const that = this;
		setupEventMode(this, null, (event) => {
			listenForSelection(event.detail.list, (event) => {
				// console.log('fetching story:' + event.detail.key);
				this.fetch(that,
				           that.stories + event.detail.key + '.md',
				           (root, story) => {root.addToStore(event.detail, story, root);});
			});
			dispatchIndexUpdate(this, this.index);
		});
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
