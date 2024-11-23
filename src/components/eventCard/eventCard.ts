import { Timestamp } from "firebase/firestore";

export enum Attribute {
    "etitle" = "etitle",
    "date" = "date",
    "location" = "location",
    "image" = "image",
    "attendees" = "attendees",
   
}

class EventCard extends HTMLElement {
    etitle?: string;
    date?: any;
    location?: string;
    image?: string;
    attendees?: number;
 

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.date:
                this.date = newValue ? new Date(newValue) : undefined;
                break;
 

            case Attribute.attendees:
                    this.attendees = newValue ? Number(newValue) : undefined;
                    break;    
            default:
                this[propName] = newValue;
                break;
        }
        
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }


    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <section class="event__card">
                    <h2>${this.etitle || ''}</h2>
                    <h4>${this.date || ''}</h4>
                    <h4>${this.location || ''}</h4>
                    <img href="${this.image || ''}">
                    <p>${this.attendees || ''}</p>
                </section>
            `;
        }
        
    }
}

customElements.define("event-card", EventCard);
export default EventCard;