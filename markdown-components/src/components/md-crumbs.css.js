import { html } from '@polymer/lit-element/lit-element.js';

export default function styles(delimiter) {

	// language=CSS
	return html`
/* Style the list */
		ul {
		    padding: 10px 16px;
		    list-style: none;
		    background-color: #eee;
		}
		
		/* Display list items side by side */
		ul li {
		    display: inline;
		    font-size: 18px;
		}
		
		/* Add a slash symbol (/) before/behind each list item */
		ul li + li:before {
		    padding: 8px;
		    color: black;
		    content: "${delimiter}";
		}
		
		/* Add a color to all links inside the list */
		ul li a {
		    /*color: #0275d8;*/
		    text-decoration: none;
		}
		
		/* Add a color on mouse-over */
		ul li a:hover {
		    /*color: #01447e;*/
		    text-decoration: underline;
		}
        `;
};
