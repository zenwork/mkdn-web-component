import { BaseElement } from './base-element';
import {
	ACCEPTOR_READY,
	Events,
	JOIN_EVENT,
	JOINER_ACCEPTED,
	JOINER_CATCHUP,
	JOINER_LEAVING,
	JOINER_READY
} from './cooperation-events';

export class ChildElement extends BaseElement {
	static get name() {return 'md-child';}

	constructor() {
		super();
		this.ancestor = null;
		this.siblings = [];
		console.debug(`constructing ${this.Class}`);
	}

	connectedCallback() {
		console.debug(`${this.Class} is connected`);
		this.init('md-parent');
	}

	disconnectedCallback() {
		this.ancestor.dispatchEvent(Events.createLeaving(this));
	}

	/**
	 * Initialize the component in standalone or cooperative mode. Pass not
	 * @param ancestorSelector  a selector to find the ancestor that accepts joiners
	 * @returns {string} 'cooperative' if attempted to register with parent; 'standalone' otherwise
	 */
	init(ancestorSelector) {
		console.debug(`${this.Class}:${this.Id} trying to join ${ancestorSelector}`);
		const that = this;

		//if no parent provided then standalone mode
		if (!ancestorSelector) {
			console.debug(`${this.Class} initializing for standalone`);
			this.standalone();
			return 'standalone';
		}

		//find parent
		const ancestor = this.ancestor = this.closest(ancestorSelector);

		if (ancestor) {
			console.debug(`${this.Class} initializing for cooperation`);
			this.cooperative();
			this.addEventListener(JOIN_EVENT, localEventAction);
			this.ancestor.addEventListener(JOIN_EVENT, sharedEventAction);
			this.join();
			return 'cooperative';
		} else {
			console.debug(`${this.Class} initializing standalone mode because no parent [${ancestorSelector}] was found`);
			this.standalone();
			return 'standalone';
		}

		function localEventAction(event) {
			let detail = event.detail;
			let source = detail.source;
			let type = detail.type;
			switch (type) {
				case JOINER_ACCEPTED:
					that.onJoinAccepted(source);
					break;
				case JOINER_CATCHUP:
					if (this.siblings.indexOf(source.Class + source.Id)<0) {
						this.siblings.push((source.Class + source.Id));
						that.onJoinerReady(source);
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
					case ACCEPTOR_READY:
						that.join();
						break;
					case JOINER_READY:
						if (!that.siblings.includes(source.Class + source.Id)) {
							that.siblings.push((source.Class + source.Id));
							that.onJoinerReady(source);
						}
						break;
					case JOINER_LEAVING:
						if (that.siblings.indexOf(source.Class + source.Id)>-1) {
							delete that.siblings[that.sibling.findIndex((i)=>i.Class + i.Id)];
							that.onJoinerReady(source);
						}
						break;
				}
			}

			function notFromSelf() {
				return source.Id ? source.Id !== that.Id : false;
			}
		}
	}

	join() {
		if (this.ancestor) this.ancestor.dispatchEvent(Events.createRequest(this));
	}

	cooperative() {

	}

	standalone() {

	}

	/**
	 * Called when this element's joining request is accepted.
	 * @param parent
	 */
	onJoinAccepted(parent) {
		this.ready();
	}

	ready() {
		this.ancestor.dispatchEvent(Events.createReady(this));
	}

	/**
	 * Called when a component that has joined is ready
	 * @param sibling
	 */
	onJoinerReady(sibling) {

	}

	/**
	 * Called when a component that has joined is leaving
	 * @param sibling
	 */
	onJoinerLeaving(sibling) {

	}

}


