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

type listMetaActivities = {
    results : MetaActivity[]
}
type listEstablishments = {
    results : Establishment[]
}
type listCoaches = {
    results : Coach[]
}

type listMembers = {
	results: User[]
}
// To display and fetch = images, levels, teachers (coaches)
// Displaying bookings => (Modal with list of attendees ?)
type Offer = {
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
	member: number,
    offer:number
}

type MetaActivity = {
    id:number,
    description: string,
    name:string
}

type Establishment = {
    id:number,
    title: string,
}

type Coach = {
    id:number,
    user: User,
}
type User = {
    name: string,
    photo: string,
}
export {
	getOfferResponse,
	getBookingsResponse,
	listMetaActivities,
	listEstablishments,
	listCoaches,
	listMembers,
	Offer,
	Booking,
	MetaActivity,
	Establishment,
	Coach,
	User,
}