import './screens/administrador'
import './screens/usuario'
import { addObserver, appState } from './store';
import { Screens } from './types/store';

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
        addObserver(this);
    }

    connectedCallback() {
       
        this.render();
    }

    render() {
        if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
        switch (appState.screen) {
            case Screens.ADMIN:
                const admin = this.ownerDocument.createElement('app-admin');
                this.shadowRoot?.appendChild(admin);
                break;

            case Screens.USUARIO:
                const usuario = this.ownerDocument.createElement('app-usuario');
                this.shadowRoot?.appendChild(usuario);
                break

    

            default:
                break;
        }
    }
}
}

customElements.define('app-container', AppContainer)