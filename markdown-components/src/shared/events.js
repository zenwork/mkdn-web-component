/**
 * util function that creates and triggers the observation of the content of a given node.
 *
 * @param ofComponent component's name
 * @param handleMutationFn function to handle the mutation
 * @param root node on which to attach the observer
 * @returns {MutationObserver}
 */
export function observeContentChange(ofComponent, handleInputFn, root) {
	// Options for the observer (which mutations to observe)
	const config = {attributes:false, childList:true, subtree:false};

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === 'childList' && mutation.target.nodeName === ofComponent.toUpperCase()) {
				let input = mutation.target.innerHTML;
				try {
					if (input) {
						handleInputFn(input, root);
					}
				} catch (e) {
					throw e;
				}

			}
		});
	});

	// Start observing the target node for configured mutations
	observer.observe(root, config);
	return observer;
}

const eventMode = 'md-view-event-mode';

export function dispatchEventMode(root) {
	// console.log('>>>: event mode');
	let event = new CustomEvent(eventMode, {detail:root});
	root.dispatchEvent(event);
}

export function listenForEventMode(root, onEventFn) {
	// console.log('<<<: event mode');
	let closestView = root.closest('md-view');
	if(closestView) closestView.addEventListener(eventMode, onEventFn);
}

const start = 'md-view-start-events';

export function dispatchStartEvents(root) {
	// console.log('>>>: start');
	root.dispatchEvent(new CustomEvent(start, {detail:root}));
}

export function listenForStartEvents(root, onEventFn) {
	// console.log('<<<: start');
	root.addEventListener(start, onEventFn);
}

const indexUpdate = 'md-store-index-updated';

export function dispatchIndexUpdate(store, index) {
	// console.log('>>>: index update');
	store.dispatchEvent(new CustomEvent(indexUpdate, {detail:index}));
}

export function listenForIndexUpdate(store, onEventFn) {
	// console.log('<<<: index update');
	store.addEventListener(indexUpdate, onEventFn);
}

export function setupEventMode(root, onEventModefn, onStartFn) {
	const wrapper = (event) => {
		if (onEventModefn) { onEventModefn();}
		let view = event.detail;
		listenForStartEvents(view, onStartFn);
	};
	listenForEventMode(root, wrapper);
}
