import { BaseElement } from './base-element';
import {
	Events,
	JOIN_EVENT,
	JOINER_ACCEPTED,
	JOINER_CATCHUP,
	JOINER_LEAVING,
	JOINER_READY,
	PARENT_READY
} from './cooperation-events';

export class ChildElement extends BaseElement {
	static get name() {return 'md-child';}

	constructor() {
		super();
		this.ancestor = null;
		this.siblings = [];
		// console.debug(`constructing ${this.Class}`);
	}

	/**
	 * Called before requesting to join parent
	 */
	beforeJoining() {}

	/**
	 * Called when the element will run in alone without the support of a containing parent
	 */
	initStandalone() {}

	/**
	 * Called when this element's request to join is accepted. Any initialization with the parent can be done then.
	 * @param parent
	 */
	onAccepted(parent) {}

	/**
	 * Called when a sibling elements have called ready(). It will only be called once per lide-cycle.
	 * @param sibling the ready element
	 */
	onSiblingReady(sibling) {}

	/**
	 * Called when a component that has joined is leaving. It will only be called once
	 * @param sibling the leaving element
	 */
	onJoinerLeaving(sibling) {}

	/**
	 * Must be called when the element is ready to collaborate. Other elements colaborating under the same parent
	 * will receive a ready event from this element only after ready() has been called.
	 */
	ready() {this.ancestor.dispatchEvent(Events.createReady(this));}

	/**
	 * Custom Element standard call when element instance connected to DOM
	 */
	connectedCallback() {
		// console.debug(`${this.Class} is connected`);
		this.joinParent('md-parent');
	}

	/**
	 * Custom Element standard call when element instance disconnected from DOM
	 */
	disconnectedCallback() {
		this.ancestor.dispatchEvent(Events.createLeaving(this));
	}

	/**
	 * Initialize the component in standalone or cooperative mode.
	 * @param ancestorSelector  a selector to find the ancestor that accepts joiners
	 * @returns {string} 'cooperative' if attempted to register with parent; 'standalone' otherwise
	 */
	joinParent(ancestorSelector) {
		// console.debug(`${this.Class}:${this.Id} trying to join ${ancestorSelector}`);
		const that = this;
		//if no parent provided then standalone mode
		if (!ancestorSelector) {
			// console.debug(`${this.Class} initializing for standalone`);
			this.initStandalone();
			return 'standalone';
		}

		//find parent
		const ancestor = this.ancestor = this.closest(ancestorSelector);

		if (ancestor) {
			// console.debug(`${this.Class} initializing for cooperation`);
			this.beforeJoining();
			this.addEventListener(JOIN_EVENT, localEventAction);
			this.ancestor.addEventListener(JOIN_EVENT, sharedEventAction);
			this.join();
			return 'cooperative';
		} else {
			// console.debug(`${this.Class} initializing standalone mode because no parent [${ancestorSelector}] was
			// found`);
			this.initStandalone();
			return 'standalone';
		}

		function localEventAction(event) {
			let detail = event.detail;
			let source = detail.source;
			let type = detail.type;
			switch (type) {
				case JOINER_ACCEPTED:
					that.onAccepted(source);
					break;
				case JOINER_CATCHUP:
					if (source.hashcode() !== that.hashcode() && that.siblings.indexOf(source.hashcode()) < 0) {
						console.debug(`${that.hashcode()} catching up with ${source.hashcode()}`);
						that.siblings.push(source.hashcode());
						that.onSiblingReady(source);
					}
					break;
			}
		}

		function sharedEventAction(event) {
			let detail = event.detail;
			let source = detail.source;

			if (notFromSelf()) {
				let type = detail.type;
				switch (type) {
					case PARENT_READY:
						//join because parent indicates it will accept requests
						that.join();
						break;
					case JOINER_READY:
						if (!that.siblings.includes(source.hashcode())) {
							// console.debug(`${that.hashcode()} receiving ready from ${source.hashcode()}`);
							that.siblings.push(source.hashcode());
							that.onSiblingReady(source);
						}
						break;
					case JOINER_LEAVING:
						if (that.siblings.indexOf(source.hashcode()) > -1) {
							delete that.siblings[that.siblings.findIndex((i) => i === source.hashcode())];
							that.onJoinerLeaving(source);
						}
						break;
				}
			}

			function notFromSelf() {
				return source.hashcode() ? source.hashcode() !== that.hashcode() : false;
			}
		}
	}

	/**
	 * dispatch a join request
	 */
	join() {
		if (this.ancestor) this.ancestor.dispatchEvent(Events.createRequest(this));
	}

}


