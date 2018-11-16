/**
 * Sate management convenience
 */
export default class EventLinker {

  /**
   * Construct default state
   * @param {Element} root requiring event linking
   * @param {Boolean} debug optional, proivide true to enable;
   * otherwise defaults to false.
   */
  constructor(root, debug=false) {
    this.root = root;
    this.listenables = [];
    this.dispatched = [];
    this.debug = debug;
  }

  /**
   * Register events interested in
   * @param {String} event
   * @param {Array} forElements
   * @param {function} doAction that will be bind() to the context provided
   * at construction
   */
  listener(event, forElements, doAction) {
    this.listenables.push({eventName: event, elementNames: forElements, fn: doAction});
  }

  /**
   * start Listening to events interested in dispatched by a listenable
   * @param {Element} listenable
   */
  startListening(listenable) {
    let listenableName;
    if (listenable.self === window) {
      listenableName = 'window';
    } else if (listenable === this.root) {
      listenableName = 'this';
    } else {
      listenableName = listenable.tagName;
    }

    this.listenables.map((entry) => {
      entry.elementNames.map((name) => {
        if (name.toUpperCase() === listenableName.toUpperCase()) {
          const listenerFn = entry.fn;
          const boundFn = listenerFn.bind(this.root);
          if (entry.eventName === 'observable') {
            this.observeContentChange(boundFn, listenable);
          } else {
            listenable.addEventListener(entry.eventName, this.wrap(boundFn));
          }
        }
      });
    });
  }

  wrap(fn) {
    if (!this.debug) {
      return fn;
    } else {
      return function(...args) {
        console.log(`calling ${fn.name}`);
        return fn(...args);
      };
    }
  }

  /**
   * register a dispatching config
   * @param {String} fromElement
   * @param {String} event
   */
  dispatcher(fromElement, event) {
    this.dispatched.push({source: fromElement, eventName: event});
  }

  /**
   * Dispatch for registered events
   * @param {String} eventName
   * @param {Object} data
   */
  dispatch(eventName, data) {
    this.dispatched.map((dispatchable) => {
      if (dispatchable.eventName === eventName) {
        let source;
        if (dispatchable.source === 'this') {
          source = this.root;
        } else {
          source = dispatchable.source;
        }
        if (data) {
          const detail = {detail: data};
          const event = new CustomEvent(dispatchable.eventName, detail);
          source.dispatchEvent(event);
        } else {
          const event = new CustomEvent(dispatchable.eventName);
          source.dispatchEvent(event);
        }
      }
    });
  }

  /**
   * util function that creates and triggers the observation of the content of a
   * given node.
   *
   * @param {function} handleInputFn function to handle the mutation
   * @param {Element} observable element to observe
   * @return {MutationObserver} observer
   */
  observeContentChange(handleInputFn, observable) {
    // Options for the observer (which mutations to observe)
    const config = {attributes: false, childList: true, subtree: false};
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList'
            && mutation.target.nodeName === observable.tagName.toUpperCase()) {
          const input = mutation.target.innerHTML;
          try {
            if (input) {
              handleInputFn(input, observable);
            }
          } catch (e) {
            throw e;
          }
        }
      });
    });

    // Start observing the target node for configured mutations
    observer.observe(observable, config);
    return observer;
  }

}

