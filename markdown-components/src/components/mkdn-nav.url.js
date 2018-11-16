import {Index} from '../shared';
import {clone} from '../shared/util';

/**
 * Url lifecycle
 */
export default class Url {

  /**
   *
   * @param {String} home title
   * @param {EventLinker} register
   * @param {Window} windowImpl optional test window implementation
   * @param {History} historyImpl optional test history implementation
   * @param {Document} documentImpl optional test document implementation
   */
  constructor(register, windowImpl = window, historyImpl = history, documentImpl = document) {
    this.history = historyImpl;
    this.document = documentImpl;
    // this.title = home;
    this.window = windowImpl;
    const loc = windowImpl.location;
    this.origin = loc.origin;
    this.pathname = loc.pathname;
    this.hash = loc.hash;
    this.register = register;

    // init crumbs
    this.crumbs = [];
    // this.crumbs.push(new Crumb(this.getHome(), home));
  }

  syncCurrentLocation() {
    const title = this.title;
    this.history.pushState({}, title, this.getUrl());
    this.document.title = title;
    return this.getCrumbs();
  }

  getHome() {
    return this.origin + this.pathname;
  }

  getUrl() {
    return this.origin + this.pathname + this.hash;
  }

  getCrumbs() {
    return clone(this.crumbs);
  }

  updateWithIndex(index) {
    const idx = index.detail;
    this.index = new Index(idx.sections, idx.stories, idx.defaultStory);
    // clear all crumbs except first
    // if (this.crumbs.length > 1) {
    //   this.crumbs = [this.crumbs[0]];
    // }
    this.crumbs = [];

    // sections
    this.index.sections.map((section) => {
      this.crumbs.push(new Crumb(section.url, section.title, 'section'));
    });
    // story
    if (this.hash && this.hash.length > 1) {
      const parts = this.hash.split('/');
      const url = parts[parts.length - 1];
      const story = this.index.getStoryByUrl(url);
      if (story) {
        this.crumbs.push(new Crumb(url, story.title));
      }
    } else {
      const defaultStory = this.index.getDefault();
      this.crumbs.push(new Crumb(defaultStory.url, defaultStory.title, 'story'));
    }
  }


  updateWithHash(event) {
    const hashSplit = event.newURL.split('#');
    const hash = hashSplit[1];

    if (hash !== this.hash) {
      this.hash = `#${hash}`;
      const elements = hashSplit[0].split('/');
      this.origin = elements[0] + '//' + elements[2];
      elements.splice(0, 3);
      this.path = elements.join('/');

      // clear all crumbs except first
      if (this.crumbs.length > 1) {
        this.crumbs = [this.crumbs[0]];
      }
      this.updateHash(hash);
    }
  }

  updateHash(hash) {
    if (hash !== this.hash) {
      this.hash = hash;
      // dispatch event to wait for index update
      this.register.dispatch('mkdn-nav-hash-url', hash);
    }
  }

  updateStory(storyDef) {
    if (this.crumbs[this.crumbs.length - 1].type === 'story') {
      this.crumbs.splice(this.crumbs.length - 1, 1);
    }
    this.crumbs.push(new Crumb('#'+storyDef.url, storyDef.title, 'story'));
    this.updateHash(`#${storyDef.url}`);
  }

  updateHome(url, title) {
    this.crumbs[0] = new Crumb(url, title, 'home');
  }

}

/**
 * Crumb
 */
export class Crumb {

  constructor(url, title, type) {
    this.url = url;
    this.title = title;
    this.type = type;
  }

}
