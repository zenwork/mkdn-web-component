import * as logger from './logger.js';
import {LitElement,html} from '@polymer/lit-element';

export default class CounterElement extends LitElement {
	static get properties() {
		return {
			clicks:{type:Number},
			value:{type:Number}
		};
	}

	constructor() {
		super();
		this.clicks = 0;
		this.value = 0;
	}

	onIncrement() {
		this.value++;
		this.clicks++;
		logger.log();
		this.dispatchEvent(new CustomEvent('counter-incremented'));
	}

	onDecrement() {
		this.value--;
		this.clicks++;
		this.dispatchEvent(new CustomEvent('counter-decremented'));
	}

	render() {
		return html`
            <style lang="postcss">
                span {
                    width: 20px;
                    display: inline-block;
                    text-align: center;
                    font-weight: bold;
                }
            </style>

            <div>
                <p>
                    Clicked: <span>${this.clicks}</span> times.
                    Value is <span>${this.value}</span>.
                    <button @click=${(e) => this.onIncrement()} title="Add 1">+</button>
                    <button @click=${(e) => this.onDecrement()} title="Minus 1">-</button>
                </p>
            </div>
                        `;
	}
}

window.customElements.define('counter-element', CounterElement);
