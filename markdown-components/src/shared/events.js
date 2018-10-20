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
							handleInputFn(input,root);
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
