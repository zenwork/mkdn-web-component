import {html}                                                                         from '@polymer/lit-element/lit-element.js';
import {ChildElement}                                                                 from '../shared/child-element';
import {dispatchIndexUpdate, dispatchStory, listenForSelection, observeContentChange} from '../shared/events';
import {StoreOperations}                                                              from '../shared/store';
import {clone}                                                                        from '../shared/util';

export class MkdnStaticStore extends ChildElement {

  static get name() {
 return 'mkdn-static-store';
}

  static get properties() {
    return {
      store: {type: Object, attribute: false},
    };
  }

  connectedCallback() {
    const state = this.findParent('mkdn-view');
    if (state === 'standalone') {
      throw Error('mkdn-static-store can not work in standalone mode');
    }
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  initAdopted(parent) {
    this.store = [];
    this.shadowRoot.store = this.store;
    observeContentChange('MKDN-STATIC-STORE', this.updateStore, this);
    dispatchIndexUpdate(this, this.index);
    super.ready();
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-list':
        const that = this;
        listenForSelection(sibling, (event) => {
          const key = event.detail.url;
          const story = StoreOperations.findStory(that.store.stories, key);
          dispatchStory(that, story);
        });

        if (this.innerHTML) {
          this.updateStore(this.innerHTML, this);
        }

        break;
    }
  }

  updateStore(input, root) {
    root.store = StoreOperations.transformIndex(input.trim());
    root.shadowRoot.store = root.store;
    const event = new CustomEvent('mkdn-store-updated');
    root.dispatchEvent(event);
    dispatchIndexUpdate(root, clone(root.store));
  }

  render() {
    return html``;
  }

}

MkdnStaticStore.define();
