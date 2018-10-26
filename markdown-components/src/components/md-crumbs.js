import { html } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { BaseElement } from '../shared/base-element';
import { observeContentChange } from '../shared/events';

export default class MdCrumbs extends BaseElement {
	static get name() {return 'md-crumbs';}

	static get properties() {
		return {
			crumbs:{type:Object, attribute:false},
			delimiter:{type:String}
		};
	}

	connectedCallback() {
		console.log(this.hashcode());
		this.crumbs = [];
		this.delimiter = '>';
		// language=CSS
		this.elementStyle = `
		 /* Style the list */
		ul {
		    padding: 10px 16px;
		    list-style: none;
		    background-color: #eee;
		}
		
		/* Display list items side by side */
		ul li {
		    display: inline;
		    font-size: 18px;
		}
		
		/* Add a slash symbol (/) before/behind each list item */
		ul li+li:before {
		    padding: 8px;
		    color: black;
		    content: "${this.delimiter}";
		}
		
		/* Add a color to all links inside the list */
		ul li a {
		    color: #0275d8;
		    text-decoration: none;
		}
		
		/* Add a color on mouse-over */
		ul li a:hover {
		    color: #01447e;
		    text-decoration: underline;
		} 
		`;

		if (this.innerHTML) {
			updateList(this.innerHTML, this);
		}

		this.observer = observeContentChange('MD-CRUMBS', updateList, this);

		function updateList(input, root) {
			root.crumbs = JSON.parse(input.trim());
			document.location.href = root.crumbs[root.crumbs.length - 1].link;
		}
	}

	render() {
		if (this.crumbs.length > 0) {
			return html`
			<style>${this.elementStyle}</style> 
			${this.renderCrumbs()}`;
		} else {
			return html``;
		}

	}

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
