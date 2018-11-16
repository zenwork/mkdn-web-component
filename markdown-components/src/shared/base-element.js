import {LitElement} from '@polymer/lit-element/lit-element.js';

let id = 0;
if (!window['mkdn']) window['mkdn'] = {dev: false};

export class BaseElement extends LitElement {

  constructor() {
    super();
    this.Id = id++;
    this.Class = new.target.name;
    // console.debug(`constructing: ${this.Class}:${this.Id}`);
    if (new.target === BaseElement) {
      throw new TypeError('Cannot construct BaseElement instances directly');
    }
  }

  hashcode() {
    return this.Class + ':' + this.Id;
  }

  connectedCallback() {
    // console.debug(`connected: ${this.Class}`);
  }

  static define(name) {
    try {
      const Class = this;
      if (name) {
        window.customElements.define(name, Class);
      } else if (this.name) {
        window.customElements.define(this.name, Class);
      } else {
        throw Error('either define [static this.name] or provide a valid name to the define(name) function');
      }
    } catch (e) {
      console.debug(`swallowing custom component define() for [${name ? name : this.name}] error: ${e.message}`);
    }
  }

  createRenderRoot() {
    // should use a 'closed' shadow dom but must be open for testing!!! Need to figure this out
    return this.attachShadow({mode: 'open'});
  }

}
