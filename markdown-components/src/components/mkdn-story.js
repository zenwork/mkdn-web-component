import {html}                                 from '@polymer/lit-element/lit-element.js';
import * as marked                            from 'marked';
import * as hljs                              from 'highlight.js';
import StoryConfig                            from './mkdn-story-config';
import {ChildElement}                         from '../shared/child-element';
import {listenForStory, observeContentChange} from '../shared/events';

/**
 * Web Component that formats and displays a markdown story. Reads markdown
 * from the component elements content. supports 'hidden' boolean/flag
 * attribute and the canonical style attribute for injecting css.
 */
export class MkdnStory extends ChildElement {

  static get name() {
    return 'mkdn-story';
  }

  static get properties() {
    return {
      markdown: {type: String, attribute: false},
      style: {type: String},
      hidden: {type: Boolean},
      stylesheet: {type: String},
      stylesheetCss: {type: String, attribute: false},
    };
  }

  connectedCallback() {
    this.marked = marked;
    this.marked.setOptions(StoryConfig.create());
    this.findParent('mkdn-view');
  }

  beforeJoining() {
    this.markdown = document.createElement('div');
    let markdown = '';
    if (window['mkdn']['dev']) {
      markdown = 'no markdown provided';
    }
    this.formatStory(markdown, this);
    if (this.stylesheet) {
      this.fetch(this, this.stylesheet, (root, styles) => {
        root.stylesheetCss = styles;
      });
    }
  }

  fetch(root, url, handleResponseFn) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        handleResponseFn(root, xmlhttp.responseText);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  initOrphaned() {
    const input = this.innerHTML;
    if (input && !this.hidden) this.formatStory(input, this);
    this.observer = observeContentChange('MKDN-STORY', this.formatStory, this);
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  onSiblingReady(sibling) {
    switch (sibling.Class) {
      case 'mkdn-store':
      case 'mkdn-static-store':
        listenForStory(sibling,
                       (storyEvent) => {
                         this.formatStory(storyEvent.detail.content, this);
                       });
        super.ready();
        break;
    }
  }

  render() {
    if (this.hidden && this.hidden !== null) {
      return html``;
    }

    if (this.stylesheet) {
      const styles = html`<style>${this.stylesheetCss}</style>`;
      const markup = html`<section class="story">${this.markdown}</section>`;
      return html`${styles}${markup}`;
    }

    if (this.style) {
      return html`<section class="story" style="${this.style}">${this.markdown}</section>`;
    }

    return html`<section class="story">${this.markdown}</section>`;
  }

  formatStory(markdown, root) {
    root.markdown.innerHTML = root.marked(markdown);
  }

}

MkdnStory.define();
