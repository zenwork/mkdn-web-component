customElements.define('wc-closed',
                      class extends HTMLElement {

                          constructor() {
                              super();
                              const div = document.createElement('div');
                              div.id = 'wc-closed';
                              div.innerHTML =`
                                        <link rel='stylesheet' href='wc/wc.css'>
                                        the closed shadow world
                                        <style>
                                            div{color:yellow;}
                                        </style>
                                      `;

                              const shadowRoot = this.attachShadow({mode:'closed'});
                              shadowRoot.appendChild(div);

                          }
                      });
