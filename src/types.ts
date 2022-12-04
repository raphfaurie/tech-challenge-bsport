// https://api.staging.bsport.io/api/v1/swagger/.

/*-------------
---- Offer ----
-------------*/

type Offer = {
    // Unique identifier of the offer.
    id: number;
    // Quantify the difficulty of the lesson.
    level: number;
    custom_level: number;
    // True if the lesson is still availble otherwise false.
    available: boolean;
    // Id of the coach.
    coach: number;
    // Id of the lesson activity type.
    meta_activity: number;
    // Date format is "YYYY-MM-DDTHH:MM:SS+HH:MM".
    date_start: string;
    // In minutes.
    duration_minute: number;
    // List of the bookings id.
    bookings: number[];
    // Id of the place where takes place the lesson.
    establishment: number;
}

type listOfferResponse = {
    // Number of elements of the request.
    count: number;
    // URL of the request to get the next page results.
    next: string;
    // URL of the request to get the previous page results.
    previous: string;
    results: Offer[];
}
/*----------------
---- Bookings ----
-----------------*/
type Booking = {
    // Name of the company related to the booking.
    name: string,
    // Identifier of the member related to the booking.
    member: number,
     // Identifier of the offer related to the booking.
    offer:number
}

type listBookingsResponse = {
    // Number of elements of the request.
    count: number,
    // URL of the request to get the next page results.
    next: string,
    // URL of the request to get the previous page results.
    previous: string,
    results: Booking[],
}

/*---------------
---- Members ----
---------------*/
type User = {
    // Full name of the customer.
    name: string,
    // URI containing the customer photo.
    photo: string,
}

type listMembersResponse = {
    // Number of elements of the request.
    count: number;
    // URL of the request to get the next page results.
    next: string;
    // URL of the request to get the previous page results.
    previous: string;
	results: User[]
}

/*----------------------
---- MetaActivities ----
-----------------------*/
type MetaActivity = {
    id: number,
    description: string,
    // Display name of the activity.
    name:string
}

type listMetaActivitiesResponse = {
    // Number of elements of the request.
    count: number;
    // URL of the request to get the next page results.
    next: string;
    // URL of the request to get the previous page results.
    previous: string;
    results : MetaActivity[]
}

/*-----------------------
----- Establishment -----
-----------------------*/

type Establishment = {
    id: number,
    // Display name of the establishment.
    title: string,
}

type listEstablishmentsResponse = {
    // Number of elements of the request.
    count: number;
    // URL of the request to get the next page results.
    next: string;
    // URL of the request to get the previous page results.
    previous: string;
    results : Establishment[]
}

/*---------------
---- Coaches ----
---------------*/
type Coach = {
    id: number,
    // Profile of the coach.
    user: User,
}

type listCoachesResponse = {
    // Number of elements of the request.
    count: number;
    // URL of the request to get the next page results.
    next: string;
    // URL of the request to get the previous page results.
    previous: string;
    results : Coach[]
}


export {
	listOfferResponse,
	listBookingsResponse,
	listMetaActivitiesResponse,
	listEstablishmentsResponse,
	listCoachesResponse,
	listMembersResponse,
	Offer,
	Booking,
	MetaActivity,
	Establishment,
	Coach,
	User,
}