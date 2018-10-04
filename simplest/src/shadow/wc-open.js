customElements.define('wc-open',
                      class extends HTMLElement {

                          constructor() {
                              super();
                              const div = document.createElement('div');
                              div.id='wc-open';
                              div.innerHTML =`
                                        <link rel='stylesheet' href='wc.css'>
                                        the open shadow world
                                        <style>
                                            div{color:yellow;}
                                        </style>
                                      `;

                              const shadowRoot = this.attachShadow({mode:'open'});
                              shadowRoot.appendChild(div);

                          }
                      });
