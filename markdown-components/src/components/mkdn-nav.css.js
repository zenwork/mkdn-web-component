import { html } from '@polymer/lit-element/lit-element.js';

export default function styles(delimiter) {

	// language=HTML
	return html`<style>
    /* Style the list */
    .mkdn-list {
        padding: 10px 16px;
        list-style: none;
        /*background-color: #eee;*/
    }

    /* Display list items side by side */
    .mkdn-list li {
        display: inline;
        font-size: 18px;
    }

    /* Add a slash symbol (/) before/behind each list item */
    .mkdn-list li + li:before {
        padding: 8px;
        color: black;
        content: "${delimiter}";
    }

    /* Add a color to all links inside the list */
    .mkdn-list li a {
        /*color: #0275d8;*/
        text-decoration: none;
    }

    /* Add a color on mouse-over */
        .mkdn-list li a:hover {
        /*color: #01447e;*/
        text-decoration: underline;
    }
</style>    `;
};
