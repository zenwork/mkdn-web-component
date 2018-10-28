import { html } from '@polymer/lit-element/lit-element.js';

export default function styles() {

	// language=CSS
	return html`
        button {
            overflow: visible;
            width: auto;
        }

        button.link {
            font-family: sans-serif;
            font-size: 1em;
            text-align: left;
            color: blue;
            background: none;
            margin: 0;
            padding: 0;
            border: none;
            cursor: pointer;

            -moz-user-select: text;

            /* override all your button styles here if there are any others */
        }

        button.link span {
            text-decoration: underline;
        }

        button.link:hover span,
        button.link:focus span {
            color: black;
        }`;
};
