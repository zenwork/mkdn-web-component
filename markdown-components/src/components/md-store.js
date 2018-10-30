import { html } from '@polymer/lit-element/lit-element.js';
import { ChildElement } from '../shared/child-element';
import { dispatchIndexUpdate, dispatchStory, listenForHashUrl, listenForSelection } from '../shared/events';
import { Index } from '../shared/index';
import { Section } from '../shared/section';
import { StoreOperations } from '../shared/store';
import { clone } from '../shared/util';

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
		this.index = new Index(new Section(null, null), {}, null);
		this.updateIndex(this.index, this);
		this.fetch(this, this.src, (root, rawJson) => {
			let index = StoreOperations.transformIndex(rawJson);
			root.updateIndex(index, root);
		});
		this.ready();
	}

	onSiblingReady(sibling) {

		const that = this;

		switch (sibling.Class) {
			case 'md-list':
				listenForSelection(sibling, (event) => {
					console.log('event.detail:' + JSON.stringify(event.detail));
					this.fetch(that,
					           that.stories + event.detail.url + '.md',
					           (root, story) => {root.addToStore(event.detail, story, root);});
				});
				break;
			case 'md-crumbs':
				listenForHashUrl(sibling, (event) => {

					let hash = event.detail;
					that.getStoryKeys()
						.map((key) => {
							let storyDef = that.getStory(key);

							if (storyDef.hash === hash || storyDef.url === hash) {
								let url = that.stories + storyDef.url + '.md';
								console.log('url:' + JSON.stringify(url));
								this.fetch(that,
								           url,
								           (root, story) => {root.addToStore(storyDef, story, root);});
							}
						});
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

	getStoryKeys() {
		return Object.keys(this.index.stories);
	}

	getStory(key) {
		return this.index.stories[key];
	}

	addToStore(def, story, root) {
		let newDef = clone(def);
		newDef.content = story;
		root.story = newDef;
		// console.log(JSON.stringify(root.story));
		dispatchStory(root, root.story);
	}

	updateIndex(value, root) {
		root.shadowRoot.value = root.index = value;
		if (Object.keys(root.index.stories).length > 0) {
			dispatchIndexUpdate(root, clone(root.index));
		}
	}
}

MdStore.define('md-store');
