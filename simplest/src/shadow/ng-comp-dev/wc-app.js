customElements.define('wc-app',
                      class extends HTMLElement {

                          constructor() {
                              super();
                              const div = document.createElement('div');
                              div.id = 'wc-app';
                              div.innerHTML =`
                                            <app-root></app-root>
                                            <script type="text/javascript" src="ng-comp-dev/runtime.js"></script>
                                            <script type="text/javascript" src="ng-comp-dev/polyfills.js"></script>
                                            <script type="text/javascript" src="ng-comp-dev/styles.js"></script>
                                            <script type="text/javascript" src="ng-comp-dev/vendor.js"></script>
                                            <script type="text/javascript" src="ng-comp-dev/main.js"></script>
                                      `;

                              const shadowRoot = this.attachShadow({mode:'open'});
                              shadowRoot.appendChild(div);

                          }
                      });
