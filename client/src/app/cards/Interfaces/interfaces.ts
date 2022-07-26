export interface Game {
    id:           number | string;
    name:         string;
    year:         number;
    consoles:     Array<Developer | string>;
    image:        string;
    active:       boolean;
    description?: string;
    createdInDb?: boolean;
    developers?:  Developer[];
}

export interface Developer {
    name: string;
    id:   number;
}
