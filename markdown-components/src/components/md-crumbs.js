import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { ChildElement } from '../shared/child-element';
import { dispatchHashUrl, listenForSelection, observeContentChange } from '../shared/events';
import styles from './md-crumbs.css.js';

export class MdCrumbs extends ChildElement {
	static get name() {return 'md-crumbs';}

	constructor() {
		super();
		this.crumbs = [];
		this.delimiter = '>';
		// history.replaceState({}, 'start', '.');
	}

	static get properties() {
		return {
			crumbs:{type:Object, attribute:false},
			delimiter:{type:String},
			view:{type:String}

		};
	}

	connectedCallback() {
		this.joinParent(this.view, {byId:true});
	}

	initStandalone() {
		if (this.innerHTML) {
			updateList(this.innerHTML, this);
		}

		this.observer = observeContentChange('MD-CRUMBS', updateList, this);

		function updateList(input, root) {
			root.crumbs = JSON.parse(input.trim());
			root.updatePageLink(root);
		}
	}

	updatePageLink(root) {
		let crumb = root.crumbs[root.crumbs.length - 1];
		console.log('crumb:' + JSON.stringify(crumb));
		history.pushState({}, crumb.name, crumb.link);
		document.title = crumb.name;
	}

	onAccepted(parent) {
		this.crumbs.push({id:'home', name:'home', link:'http://localhost:8080/demo'});

		window.addEventListener('hashchange', () => {
			let hash = window.location.hash.substr(1);

			if (hashHasChanged(hash, this.crumbs) || hasNoCrumbs(hash, this.crumbs)) {
				console.log(`dispatch: ${hash}`);
				dispatchHashUrl(this, hash);
			}

			function hasNoCrumbs(hash, crumbs) {
				return (hash && !crumbs);
			}

			function hashHasChanged(hash, crumbs) {
				return (hash && crumbs && hash !== crumbs[crumbs.length - 1]);
			}

		});

		this.ready();
	}

	onSiblingReady(sibling) {
		switch (sibling.Class) {
			case 'md-list':
				// console.log(sibling.hashcode());
				listenForSelection(sibling, (event) => {
					let crumbs = [];
					const storyDef = event.detail;
					crumbs.push({id:'home', name:'home', link:'http://localhost:8080/demo'});
					crumbs.push({id:storyDef.key, name:storyDef.title, link:`#${storyDef.url}`});
					this.crumbs = crumbs;
					this.updatePageLink(this);
				});

				break;
			case 'md-store':
			case 'md-tatic-store':
				if (window.location.hash) {
					dispatchHashUrl(this, window.location.hash.substr(1));
				}
				break;

		}
	}

	render() {
		if (this.crumbs.length > 0) {
			return html`
			${this.elementStyle()} 
			${this.renderCrumbs()}`;
		} else {
			return html`
			${this.elementStyle()}
			<ul><li>&nbsp;</li></ul>`;
		}
	}

	elementStyle() {return html`<style>${styles(this.delimiter)}</style>`;}

	renderCrumbs() {
		return html`<ul>
					${repeat(this.crumbs,
		                     (crumb) => { return crumb.id;},
		                     (crumb) => {return html`<li><a href="${crumb.link}">${crumb.name}</a></li>`;}
		)}
					</ul>`;
	}
}

MdCrumbs.define();

