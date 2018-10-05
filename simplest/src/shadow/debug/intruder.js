/**
 * Prove that the shadow DOMs are visibble or hidden
 */
function addIntruder(tagname) {

    let element = document.getElementsByTagName(tagname)[0];
    if (element) {
        let root = element.shadowRoot;

        if (root) {
            let div = root.getElementById(tagname);
            div.innerHTML
                = `${div.innerHTML}<p>INTRUDER CSS ADDED!</p><style>div{color:greenyellow;margin-left:33%;margin-right: 33%;}</style>`;
            return `[${tagname}] DOM is visible and was changed.`;
        } else {
            return `[${tagname}] DOM is hidden.`;
        }
    } else {
        return `[${tagname}] Not found.`;
    }

}
