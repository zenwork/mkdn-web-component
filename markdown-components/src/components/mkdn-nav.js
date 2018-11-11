import {html}            from '@polymer/lit-element/lit-element.js';
import {repeat}          from 'lit-html/directives/repeat';
import {ChildElement}    from '../shared/child-element';
import {dispatchHashUrl} from '../shared/events';
import EventLinker       from '../shared/eventLinker';
import styles            from './mkdn-nav.css.js';

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
  }

  connectedCallback() {
    this.joinParent(this.view, {byId: true});
  }

  initStandalone() {
    this.register.listener('observable', ['this'], this.onElementContentChange);
    this.register.startListening(this);
    this.onElementContentChange(this.innerHTML);
  }

  onAccepted(parent) {
    this.register.listener('hashchange', ['window'], this.onHashChange);
    this.register.listener('mkdn-list-selection', ['mkdn-list'], this.onSelection);
    this.register.listener('mkdn-store-index-updated', ['mkdn-store', 'mkdn-static-store'], this.onIndexChanged);

    this.register.dispatcher('this', 'mkdn-nav-hash-url');

    this.register.startListening(window);

    this.ready();
  }


  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-list':
        this.register.startListening(sibling);
        break;
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
                     return crumb.id;
                   },
                   (crumb) => {
                     return html`<li><a href="${crumb.link}">${crumb.name}</a></li>`;
                   })}
          </ul>`;
    } else {
      return html`<ul class="mkdn-list"><li>&nbsp;</li></ul>`;
    }
  }

  static updatePageLink(root) {
    const crumb = root.crumbs[root.crumbs.length - 1];
    history.pushState({}, crumb.name, crumb.link);
    document.title = crumb.name;
  }

  onElementContentChange(input) {
    if (input) {
      this.crumbs = JSON.parse(input.trim());
      MkdnNav.updatePageLink(this);
    }
  }

  onHashChange() {
    const hash = window.location.hash.substr(1);

    if (hashHasChanged(hash, this.crumbs) || hasNoCrumbs(hash, this.crumbs)) {
      // console.log(`dispatch: ${hash}`);
      dispatchHashUrl(this, hash);
      MkdnNav.updatePageLink(this);
    }

    function hasNoCrumbs(hash, crumbs) {
      return (hash && !crumbs);
    }

    function hashHasChanged(hash, crumbs) {
      return (hash && crumbs && hash !== crumbs[crumbs.length - 1]);
    }
  };

  onSelection(event) {
    const storyDef = event.detail;
    if (!this.crumbs) this.crumbs = [];
    if (this.crumbs && this.crumbs.length > 1) {
      this.crumbs.pop();
    }
    this.crumbs.push({id: storyDef.url, name: storyDef.title, link: `#${storyDef.url}`});
    this.crumbs = [...this.crumbs];
    MkdnNav.updatePageLink(this);
  };

  onIndexChanged(event) {
    const index = event.detail;
    const parent = index.section;
    const crumbs = [];
    crumbs.push({id: parent.url, name: parent.title, link: parent.url});
    this.crumbs = crumbs;
  };

}

MkdnNav.define();

