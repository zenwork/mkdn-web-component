import { BaseElement } from './base-element';
import { Events, JOIN_EVENT, JOINER_LEAVING, JOINER_READY, JOINER_REQUEST } from './cooperation-events';

export class ParentElement extends BaseElement {
	static get name() {return 'md-parent';}

	constructor() {
		super();
		this.joiners = {};
	}

	connectedCallback() {
		this.initParent();
	}

	initParent() {
		this.addEventListener(JOIN_EVENT, (event) => {
			let source = event.detail.source;
			switch (event.detail.type) {
				case JOINER_REQUEST:
					this.requestToJoin(source);
					break;
				case JOINER_READY:
					this.joinerReady(source);
					break;
				case JOINER_LEAVING:
					this.joinerLeaving(source);
					break;
			}
		});

		this.dispatchEvent(Events.createAcceptorReady(this));
	}

	requestToJoin(source) {
		console.debug(`${this.Class} is accepting ${source.Class}:${source.Id} request to join`);
		source.dispatchEvent(Events.createAccept(this));
		this.joiners[source.hashcode()] = source;
	}

	joinerReady(source) {
		Object.keys(this.joiners).forEach((key) => {
			let alreadyJoined = this.joiners[key];
			source.dispatchEvent(Events.createCatchup(alreadyJoined));
		});
	}

	joinerLeaving(source) {
		delete this.joiners[source.hashcode()];

	}
}
