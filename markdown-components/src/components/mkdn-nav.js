import {html}         from '@polymer/lit-element/lit-element.js';
import {repeat}       from 'lit-html/directives/repeat';
import {ChildElement} from '../shared/child-element';
import EventLinker    from '../shared/eventLinker';
import styles         from './mkdn-nav.css.js';
import Url, {Crumb}   from './mkdn-nav.url';

/**
 * MkDn Navigation component
 */
export class MkdnNav extends ChildElement {

  static get name() {
    return 'mkdn-nav';
  }

  /**
   * watched properties
   * @return {Object}
   */
  static get properties() {
    return {
      crumbs: {type: Array, attribute: false},
      delimiter: {type: String},
      view: {type: String},
      state: {type: Object, attribute: false},
    };
  }

  /**
   * constructor
   */
  constructor() {
    super();
    this.delimiter = '>';
    this.register = new EventLinker(this, true);
    this.url = new Url('home', this.register);
    this.crumbs = this.url.syncCurrentLocation();
    this.register.listener('hashchange', ['window'], this.onHashChange);
  }

  connectedCallback() {
    this.findParent(this.view, {byId: true});
  }

  initOrphaned() {
    this.register.listener('observable', ['this'], this.onElementContentChange);
    this.register.startListening(this);
    this.onElementContentChange(this.innerHTML);
  }

  initAdopted(parent) {
    this.register.listener('mkdn-store-index-updated', ['mkdn-store', 'mkdn-static-store'], this.onSelection);
    this.register.listener('mkdn-store-story', ['mkdn-store'], this.onStoryLoaded);
    this.register.dispatcher('this', 'mkdn-nav-hash-url');

    this.register.startListening(window);

    this.url.updateHome(window.location.href,'home');

    this.ready();
  }

  onSelection(evt) {
    this.url.updateWithIndex(evt);
    this.crumbs = this.url.syncCurrentLocation();
  }

  onHashChange(evt) {
    this.url.updateWithHash(evt);
    this.crumbs = this.syncCurrentLocation();
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-store':
      case 'md-static-store':
        this.register.startListening(sibling);
        if (window.location.hash) {
          this.register.dispatch('mkdn-nav-hash-url', window.location.hash.substr(1));
        }
        break;
    }
  }

  /**
   * render element
   * @return {TemplateResult}
   */
  render() {
    return html`
      ${styles(this.delimiter)} 
      ${this.renderCrumbs()}`;
  }

  /**
   * @return {TemplateResult}
   */
  renderCrumbs() {
    if (this.crumbs && this.crumbs.length > 0) {
      return html`
          <ul class="mkdn-list">
          ${repeat(this.crumbs,
                   (crumb) => {
                     return crumb.url;
                   },
                   (crumb) => {
                     return html`<li><a href="${crumb.url}">${crumb.title}</a></li>`;
                   })}
          </ul>`;
    } else {
      return html`<ul class="mkdn-list"><li>&nbsp;</li></ul>`;
    }
  }

  static updatePageLink(root) {
    const crumb = root.crumbs[root.crumbs.length - 1];
    history.pushState({}, crumb.name, crumb.url);
    document.title = crumb.name;
  }

  onElementContentChange(input) {
    if (input) {
      this.crumbs = JSON.parse(input.trim());
      MkdnNav.updatePageLink(this);
    }
  }

  onStoryLoaded(event) {
    const storyDef = event.detail;
    this.url.updateStory(storyDef);
    this.crumbs = this.url.syncCurrentLocation();
  }



}

MkdnNav.define();

