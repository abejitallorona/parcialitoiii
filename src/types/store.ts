export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	events: any[];
	currentEvent: {  
        etitle?: string;
        date: Date;
        location: string;
        attendees: number;
        image: string;
    } | null;
	
	
	
};


export enum SomeActions {
  "X" = "X",
}




export enum Screens {
	'ADMIN' = 'ADMIN',
	'USUARIO' = 'USUARIO',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETEVENTS' = 'GETEVENTS',
}