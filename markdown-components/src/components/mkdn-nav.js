import {html}         from '@polymer/lit-element/lit-element.js';
import {repeat}       from 'lit-html/directives/repeat';
import {ChildElement} from '../shared/child-element';
import {
  dispatchHashUrl,
  initFromAndObserveContent, listenForIndexUpdate,
  listenForSelection,
}                     from '../shared/events';
import styles         from './mkdn-nav.css.js';

export class MkdnNav extends ChildElement {
  static get name() {return 'mkdn-nav';}

  constructor() {
    super();
    this.delimiter = '>';
  }

  static get properties() {
    return {
      crumbs: {type: Array, attribute: false},
      delimiter: {type: String},
      view: {type: String},
    };
  }

  connectedCallback() {
    this.joinParent(this.view, {byId: true});
  }

  initStandalone() {
    this.observer = initFromAndObserveContent('MKDN-NAV',
                                              function(input, root) {
                                                root.crumbs = JSON.parse(input.trim());
                                                MkdnNav.updatePageLink(root);
                                              },
                                              this);
  }

  onAccepted(parent) {

    window.addEventListener('hashchange', () => {
      let hash = window.location.hash.substr(1);

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

    });

    this.ready();
  }

  static updatePageLink(root) {
    let crumb = root.crumbs[root.crumbs.length - 1];
    history.pushState({}, crumb.name, crumb.link);
    document.title = crumb.name;
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-list':
        listenForSelection(sibling, (event) => {
          const storyDef = event.detail;
          if(!this.crumbs) this.crumbs=[];
          if (this.crumbs && this.crumbs.length > 1) {
            this.crumbs.pop();
          }
          this.crumbs.push(
            {id: storyDef.url, name: storyDef.title, link: `#${storyDef.url}`});
          this.crumbs = [...this.crumbs];
          MkdnNav.updatePageLink(this);
        });

        break;
      case 'mkdn-store':
      case 'md-tatic-store':
        listenForIndexUpdate(sibling, (event) => {
          let index = event.detail;
          let parent = index.section;
          let crumbs = [];
          crumbs.push({id: parent.url, name: parent.title, link: parent.url});
          this.crumbs = crumbs;
        });

        if (window.location.hash) {
          dispatchHashUrl(this, window.location.hash.substr(1));
        }
        break;
    }
  }

  render() {
    return html`
			${styles(this.delimiter)} 
			${this.renderCrumbs()}`;
  }

  renderCrumbs() {
    if (this.crumbs && this.crumbs.length > 0) {
      return html`
          <ul class="mkdn-list">
					${repeat(this.crumbs,
                   (crumb) => { return crumb.id;},
                   (crumb) => {return html`<li><a href="${crumb.link}">${crumb.name}</a></li>`;})}
					</ul>`;
    } else {
      return html`<ul class="mkdn-list"><li>&nbsp;</li></ul>`;
    }
  }
}

MkdnNav.define();

