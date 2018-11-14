/**
 * util function that creates and triggers the observation of the content of a
 * given node.
 *
 * @param ofComponent component's name
 * @param handleInputFn function to handle the mutation
 * @param root node on which to attach the observer
 * @return {MutationObserver}
 */
export function observeContentChange(ofComponent, handleInputFn, root) {
  // Options for the observer (which mutations to observe)
  const config = {attributes: false, childList: true, subtree: false};

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.target.nodeName ===
          ofComponent.toUpperCase()) {
        const input = mutation.target.innerHTML;
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

export function initFromAndObserveContent(ofComponent, handleInputFn, root) {
  if (root.innerHTML) {
    handleInputFn(root.innerHTML, root);
  }

  return observeContentChange(ofComponent, handleInputFn, root);
}

const indexUpdate = 'mkdn-store-index-updated';

export function dispatchIndexUpdate(store, index) {
  // console.log('>>>: index update');
  store.dispatchEvent(new CustomEvent(indexUpdate, {detail: index}));
}

export function listenForIndexUpdate(store, onEventFn) {
  // console.log('<<<: index update');
  store.addEventListener(indexUpdate, onEventFn);
}

export function dispatchSelection(root, storyDef) {
  const event = new CustomEvent('mkdn-list-selection', {detail: storyDef});
  root.dispatchEvent(event);
}

export function dispatchHashUrl(root, hash) {
  const event = new CustomEvent('mkdn-nav-hash-url', {detail: hash});
  root.dispatchEvent(event);
}

export function listenForHashUrl(list, actionFn) {
  // console.log('<<<: selection');
  list.addEventListener('mkdn-nav-hash-url', actionFn);
}

export function listenForSelection(list, actionFn) {
  // console.log('<<<: selection');
  list.addEventListener('mkdn-list-selection', actionFn);
}

export function dispatchStory(root, storyDef) {
  const event = new CustomEvent('mkdn-store-story', {detail: storyDef});
  root.dispatchEvent(event);
}

export function listenForStory(store, actionFn) {
  // console.log('<<<: selection');
  if (store) store.addEventListener('mkdn-store-story', actionFn);
}
