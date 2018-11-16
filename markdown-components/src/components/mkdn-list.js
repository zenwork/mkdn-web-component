import {html}                                                          from '@polymer/lit-element/lit-element.js';
import {repeat}                                                        from 'lit-html/directives/repeat';
import {ChildElement}                                                  from '../shared/child-element';
import {dispatchSelection, listenForIndexUpdate, observeContentChange} from '../shared/events';
import {StoreOperations}                                               from '../shared/store';
import {clone}                                                         from '../shared/util';
import styles                                                          from './mkdn-list.css.js';

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
    this.empty = {};
  }

  connectedCallback() {
    this.inputList = this.empty;
    super.findParent('mkdn-view');
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }

  initOrphaned() {
    if (this.innerHTML) {
      updateList(this.innerHTML, this);
    }
    this.observer = observeContentChange('MKDN-LIST', updateList, this);

    function updateList(input, root) {
      root.inputList = StoreOperations.transformIndex(input.trim());
    }
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-store':
      case 'mkdn-static-store':
        listenForIndexUpdate(sibling,
                             (event) => {
                               this.inputList = event.detail;
                               if (!window.location.hash) {
                                 this.select(this, this.inputList.defaultStory);
                                 this.ready();
                               }
                             });
        break;
      case 'mkdn-story':
        if (!window.location.hash && this.inputList.length > 0) {
          this.select(this, this.inputList.defaultStory);
          super.ready();
        }
        break;
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

