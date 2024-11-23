import EventCard, { Attribute } from '../components/eventCard/eventCard';
import { getEventsAction } from '../store/action';
import { dispatch } from '../store';
import { appState } from '../store';
class Usuario extends HTMLElement {
    eventList: EventCard[]=[]
    constructor()  {
        super();
        this.attachShadow( {mode: 'open'});
    }

    async connectedCallback() {
        if (appState.events.length === 0) {
            const eventsAction = await getEventsAction();
            dispatch(eventsAction)
        }

        this.render();
        
        const editEventHandler = (productId: string) => {
            const eventToEdit = appState.events.find(product => product.id === productId);
        
            if (eventToEdit) {
                appState.currentEvent = {
                    etitle: eventToEdit.etitle,
                    date: eventToEdit.date,
                    location: eventToEdit.location,
                    attendees: eventToEdit.attendees,
                    image: eventToEdit.image,
                };

            }
        };
    }

    async render()  {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
           <event-card></event-card>
           <button class="btn">Count me in!</button>
            `;

          
            appState.events?.forEach(e => {
                const event = this.ownerDocument.createElement('event-card') as EventCard;
                event.setAttribute(Attribute.etitle, event.etitle || '');
                event.setAttribute(Attribute.date, event.date);
                event.setAttribute(Attribute.location, event.location || '');
                event.setAttribute(Attribute.image, event.image || '');
                this.eventList.push(event);
            });

            const container = this.shadowRoot?.querySelector('.events');
            this.eventList.forEach((event) => {
                container?.appendChild(event);
            });
        };
        
        
        
    }

}

customElements.define('app-usuario', Usuario);