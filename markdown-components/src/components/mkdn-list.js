import {html}              from '@polymer/lit-element/lit-element.js';
import {repeat}            from 'lit-html/directives/repeat';
import {ChildElement}      from '../shared/child-element';
import EventLinker         from '../shared/eventLinker';
import {dispatchSelection} from '../shared/events';
import {StoreOperations}   from '../shared/store';
import {clone}             from '../shared/util';
import styles              from './mkdn-list.css.js';

/**
 * List component that shows the stories in the index
 */
export class MkdnList extends ChildElement {

  static get name() {
    return 'mkdn-list';
  }

  static get properties() {
    return {
      inputList: {type: Object, attribute: false},
    };
  }

  constructor() {
    super();
    this.register = new EventLinker(this);
    this.empty = {};
  }

  connectedCallback() {
    this.inputList = this.empty;
    super.findParent('mkdn-view');
  }

  initOrphaned() {
    this.register.listener('observable', ['this'], updateList);
    if (this.innerHTML) {
      updateList(this.innerHTML, this);
    }

    function updateList(input, root) {
      root.inputList = StoreOperations.transformIndex(input.trim());
    }
  }

  initAdopted(parent) {
    this.register.listener('mkdn-store-index-updated', ['mkdn-store', 'mkdn-static-store'], this.onIndexChange);
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-store':
      case 'mkdn-static-store':
        this.register.startListening(sibling);
        break;
      case 'mkdn-story':
        // todo: this might be part of hash problem. should listen to
        //  mkdn-nav instead of this.
        if (!window.location.hash && this.inputList.length > 0) {
          this.select(this, this.inputList.defaultStory);
          super.ready();
        }
        break;
      // case 'mkdn-nav':
      //   this.register.startListening(sibling);
      //   break;
    }
  }


  onIndexChange(event) {
    this.inputList = event.detail;
    if (!window.location.hash) {
      this.select(this, this.inputList.defaultStory);
      this.ready();
    }
  }

  render() {
    const that = this;

    return html`
    <style>
      ${styles()}
    </style>
    <section><ul>${renderItems(this.inputList, this.empty)}</ul></section>`;

    function renderItems(inputList, empty) {
      if (inputList === empty) {
        if (window['mkdn']['dev']) {
          return html`<li>no items</li>`;
        } else {
          return html``;
        }
      } else {
        return html`${repeat(Object.keys(inputList.stories),
                             (key) => {
                               return key;
                             },
                             (key) => {
                               return renderItem(key);
                             })}`;
      }
    }

    function renderItem(key) {
      const story = that.inputList.stories[key];

      let select;
      if (story.redirect) {
        select = () => {
          window.location = story.url;
        };
      } else {
        select = () => {
          that.select(that, key);
        };
      }
      return html`<li> <button class="link" @click=${select}>${story.title}</button> </li>`;
    }
  }

  select(root, key) {
    const story = root.inputList.stories[key];
    dispatchSelection(root, clone(story));
  }

}

MkdnList.define();

