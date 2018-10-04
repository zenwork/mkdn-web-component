customElements.define('wc-debugger',
                      class extends HTMLElement {

                          constructor() {
                              super();
                              const that = this;
                              this.div = document.createElement('div');
                              this.div.id = 'wc-debugger';
                              this.div.style['all'] = 'initial';
                              this.div.innerHTML = `
                                        <div>
                                        <link rel="stylesheet" href="debug.css"/>
                                        <h3>debug</h3>
                                        <ol class="debug"></ol>
                                        </div>`;
                              const shadowRoot = this.attachShadow({mode:'open'});
                              shadowRoot.appendChild(this.div);

                              const d = this.div;
                              window.addEventListener('wc-debug-event',
                                                   function (event) {
                                                        console.log('event handled');
                                                       // that.debug(event.detail   );
                                                       let p = document.createElement('li');
                                                       p.innerHTML = event.detail;
                                                       d.getElementsByClassName('debug')[0].appendChild(p);
                                                   });

                          }

                          debug(msg) {
                              let p = document.createElement('li');
                              p.innerHTML = msg;
                              this.div.getElementsByClassName('debug')[0].appendChild(p);
                          }
                      });

function debugMessage(message) {
    console.log('triggering');
    let event = new CustomEvent('wc-debug-event', {detail:message});
    window.dispatchEvent(event);
}
