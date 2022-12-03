import { getRequest } from "./utils";

type getOfferResponse = {
    count: number;
    next: string;
    previous: string;
    results: Offer[];
}

type getBookingsResponse = {
    count: number;
    next: string;
    previous: string;
    results: Booking[];
}
// To display and fetch = images, levels, teachers (coaches)
// Displaying bookings => (Modal with list of attendees ?)
export type Offer = {
    company: number;
    level: number;
    custom_level: number;
    available: boolean;
    coach: number;
    meta_activity: number;
    date_start: string;
    // in minutes
    duration_minute: number;
    bookings: number[];
    group: number;
    id: number;
    establishment: number;
}

type Booking = {
    name: string,
    consumer: number,
    offer:number
}

type MetaActivity = {
    description: string,
    name:string
}

type Establishment = {
    title: string,
}

type Coach = {
    user: User,
}
type User = {
    name: string,
    photo: string,
}


const _offerPath = "/offer/?"
const _bookingPath = "/booking/?"
const _metaActivityPath = "/meta-activity/"
const _establishmentPath = "/establishment/"
const _coachPath = "/coach/"


export const fetchOfferByDate = async (minDate: string, maxDate: string): Promise<Offer[]> => {
    const offerParams = [["min_date",minDate],["max_date",maxDate],["company","6"]]
    try {
        const res =await getRequest(_offerPath,offerParams)
        const offerList = (await res.json() as getOfferResponse).results
        return offerList
    } catch (err) {
        throw(err)
    }
}

export const fetchBookingsByOffer = async(offer: number): Promise<Booking[]> => {
    const bookingParams = [["offer", offer.toString()]]
    try {
        const res = await getRequest(_bookingPath, bookingParams)
        const bookings = (await res.json() as getBookingsResponse)
        return bookings.results
    } catch (err) {
        throw(err)
    }
    
}

export const getMetaActivity = async (metaActivity:number): Promise<string> => {
    try {
        const res = await getRequest(_metaActivityPath + metaActivity.toString() + "/")
        const metaActivityDescription = (await res.json() as MetaActivity).name
        return metaActivityDescription
    } catch (err) {
        throw(err)
    }
}

export const getEstablishment = async (establishment:number): Promise<string> => {
    try {
        const res = await getRequest(_establishmentPath + establishment.toString() + "/")
        const metaActivityDescription = (await res.json() as Establishment).title
        return metaActivityDescription
    } catch (err) {
        throw(err)
    }
}

export const fetchMetaActivity = async (offers: Offer[]) => {
    var metaActivities: { [metaActivity: number]: string } = {}
    for (let i = 0; i < offers.length; i++) {
        if (metaActivities[offers[i].meta_activity] === undefined) {
            const res = await getMetaActivity(offers[i].meta_activity)
            metaActivities = { ...metaActivities, [offers[i].meta_activity]: res }
        }
    }
    return metaActivities
}

export const fetchLocation = async (offers: Offer[]) => {
    var locations: { [establishment: number]: string } = {}
    for (let i = 0; i < offers.length; i++) {
        if (locations[offers[i].establishment] === undefined) {
            const res = await getEstablishment(offers[i].establishment)
            locations = { ...locations, [offers[i].establishment]: res }
        }
    }
    return locations
}

export const getCoach = async (coach:number): Promise<string> => {
    try {
        const res = await getRequest(_coachPath + coach.toString() + "/")
        const coachName = (await res.json() as Coach).user.name
        return coachName
    } catch (err) {
        throw(err)
    }
}
export const fetchCoaches = async (offers: Offer[]) => {
    var coaches: { [coach: number]: string } = {}
    for (let i = 0; i < offers.length; i++) {
        if (coaches[offers[i].coach] === undefined) {
            const res = await getCoach(offers[i].coach)
            coaches = { ...coaches, [offers[i].coach]: res }
        }
    }
    return coaches
}