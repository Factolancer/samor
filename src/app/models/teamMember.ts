/**
 * Created by Fincash on 20-02-2017.
 */
export class Team {
    constructor(public name?: string,
                public role?: string,
                public image?: string,
                public bio?: string,
                public profNetLink?: string) {
    }

}

export class Founder {
    constructor(public team?: Team) {

    }

}