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

const indexUpdate = 'md-store-index-updated';

export function dispatchIndexUpdate(store, index) {
	// console.log('>>>: index update');
	store.dispatchEvent(new CustomEvent(indexUpdate, {detail:index}));
}

export function listenForIndexUpdate(store, onEventFn) {
	// console.log('<<<: index update');
	store.addEventListener(indexUpdate, onEventFn);
}

export function dispatchSelection(root, storyDef) {
	let event = new CustomEvent('md-list-selection', {detail:storyDef});
	root.dispatchEvent(event);
}

export function dispatchHashUrl(root, hash) {
	let event = new CustomEvent('md-crumbs-hash-url', {detail:hash});
	root.dispatchEvent(event);
}

export function listenForHashUrl(list, actionFn) {
	// console.log('<<<: selection');
	list.addEventListener('md-crumbs-hash-url', actionFn);
}


export function listenForSelection(list, actionFn) {
	// console.log('<<<: selection');
	list.addEventListener('md-list-selection', actionFn);
}

export function dispatchStory(root, storyDef) {
	let event = new CustomEvent('md-store-story', {detail:storyDef});
	root.dispatchEvent(event);
}

export function listenForStory(store, actionFn) {
	// console.log('<<<: selection');
	if(store) store.addEventListener('md-store-story', actionFn);
}
