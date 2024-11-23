import { dispatch } from '../../store';
import { navigate } from '../../store/action';
import { Screens } from '../../types/store';
import { addEvent } from '../../utils/firebase';

const event = {
    etitle: '',
	date: '',
	location: '',
    image: '',
	attendees: '',
}
class EventForm extends HTMLElement {
   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    changeTitle(e: any)  {
        event.etitle = e.target.value;
    }
    changeDate (e: any)  {
        event.date = e.target.value;
    }
    changeLocation (e: any)  {
        event.location = e.target.value;
    }

    changeImage (e: any)  {
        event.image = e.target.value;
    }

    
    submitForm()  {
        addEvent(addEvent);
        alert('evento creadísimo din din din')
        dispatch(navigate(Screens.USUARIO))
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input type="text" id="Title" placeholder="Enter event name">
                     <input type="date" id="date">
                      <input type="text" id="location" placeholder="Enter location" >
                      <input type="text" id="image" placeholder="Enter Image URL" >
                    <button id="submitButton" type="submit">Add Event</button>
                </div>
            `;
            const buttonSubmit = this.shadowRoot?.querySelector("#submitButton")as HTMLButtonElement;
                buttonSubmit.addEventListener('click', this.submitForm);

                const songTitle = this.shadowRoot?.querySelector("#Title") as HTMLInputElement;
                songTitle.addEventListener('change', this.changeTitle);
	
                const songArtist = this.shadowRoot?.querySelector("#date") as HTMLInputElement;
                songArtist.addEventListener('change', this.changeDate);

                const songAlbum = this.shadowRoot?.querySelector("#location") as HTMLInputElement;
                songAlbum.addEventListener('change', this.changeLocation);

                const songImage = this.shadowRoot?.querySelector("#imageLink") as HTMLInputElement;
                songImage.addEventListener('change', this.changeImage);
        }
        
    }
}

customElements.define("event-form", EventForm);
export default EventForm;