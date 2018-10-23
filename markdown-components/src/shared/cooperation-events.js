export const JOIN_EVENT = 'md-join';
export const ACCEPTOR_READY = 'md-acceptor-ready';
export const JOINER_REQUEST = 'md-join-request';
export const JOINER_ACCEPTED = 'md-join-accepted';
export const JOINER_READY = 'md-join-ready';
export const JOINER_CATCHUP = 'md-join-catchup';
export const JOINER_LEAVING = 'md-join-leaving';

export class Events {

	/**
	 *
	 * @param joiner
	 * @returns {CustomEvent<{type : string, source : *}>}
	 */
	static createRequest(joiner) {
		let details = {detail:{type:JOINER_REQUEST, source:joiner}};
		return new CustomEvent(JOIN_EVENT, details);
	}

	static createAccept(acceptor) {
		let details = {detail:{type:JOINER_ACCEPTED, source:acceptor}};
		return new CustomEvent(JOIN_EVENT, details);
	}

	static createReady(joiner) {
		let details = {detail:{type:JOINER_READY, source:joiner}};
		return new CustomEvent(JOIN_EVENT, details);
	}

	static createCatchup(joiner) {
		let details = {detail:{type:JOINER_CATCHUP, source:joiner}};
		return new CustomEvent(JOIN_EVENT, details);
	}

	static createAcceptorReady(joiner) {
		let details = {detail:{type:ACCEPTOR_READY, source:joiner}};
		return new CustomEvent(JOIN_EVENT, details);
	}

	static createLeaving(joiner) {
		let details = {detail:{type:JOINER_LEAVING, source:joiner}};
		return new CustomEvent(JOIN_EVENT, details);
	}
}
