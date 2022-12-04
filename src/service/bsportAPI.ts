import {
    Booking,
    listBookingsResponse,
    listOfferResponse,
    Offer, User, listMetaActivitiesResponse, listEstablishmentsResponse, listCoachesResponse, listMembersResponse
} from "../types";
import { getRequest } from "../utils";

// https://api.staging.bsport.io/api/v1/swagger/
const _offerPath = "/offer/"
const _bookingPath = "/booking/"
const _metaActivityPath = "/meta-activity/"
const _establishmentPath = "/establishment/"
const _coachPath = "/coach/"
const _memberPath = "/member/"

// Returns the first page of the offers which take place between the minDate and the maxDate.
// TO-DO = fetch the results for all the pages.
export const fetchOfferByDate = async (minDate: string, maxDate: string): Promise<Offer[]> => {
    const offerParams = [["min_date",minDate],["max_date",maxDate],["company","6"]]
    try {
        const res = await getRequest(_offerPath+"?",offerParams)
        const offerList = (await res.json() as listOfferResponse).results
        return offerList
    } catch (err) {
        throw(err)
    }
}

// Returns the first page of the bookings related to a given offer.
export const fetchBookingsByOffer = async(offer: number): Promise<Booking[]> => {
    const bookingParams = [["offer", offer.toString()]]
    try {
        const res = await getRequest(_bookingPath+"?", bookingParams)
        const bookings = (await res.json() as listBookingsResponse)
        return bookings.results
    } catch (err) {
        throw(err)
    }
    
}

// Returns a map which is used to get a meta-activity display name given its id.
export const fetchMetaActivities = async (offers: Offer[]):Promise< { [metaActivity: number]: string }> => {
    const metaActivitiesParams = offers.reduce((prev, cur) => {
        return prev+","+cur.meta_activity
    }, "")
    try {
        const res = await getRequest(_metaActivityPath+"?", [["id__in", metaActivitiesParams]])
        const lMetaActivities = (await res.json() as listMetaActivitiesResponse)
        const metaActivities = lMetaActivities.results
        var metaActivitiesName: { [metaActivity: number]: string } = {}
        for (let i = 0; i < metaActivities.length; i++) {
            if (metaActivitiesName[metaActivities[i].id] === undefined) {
                metaActivitiesName = { ...metaActivitiesName, [metaActivities[i].id]:metaActivities[i].name  }
            }
        }
        return metaActivitiesName
    } catch (err) {
        throw(err)
    }
}

// Returns a map which is used to get an establishment display name given its id.
export const fetchEstablishments= async (offers: Offer[]):Promise<{ [establishment: number]: string } >=> {
    const establishmentParams = offers.reduce((prev, cur) => {
        return prev+","+cur.establishment
    }, "")
    try {
        const res = await getRequest(_establishmentPath+"?", [["id__in", establishmentParams]])
        const lEstablishment = (await res.json() as listEstablishmentsResponse)
        const establishments = lEstablishment.results
        var establishmentName: { [establishment: number]: string } = {}
        for (let i = 0; i < establishments.length; i++) {
            if (establishmentName[establishments[i].id] === undefined) {
                establishmentName = { ...establishmentName, [establishments[i].id]:establishments[i].title  }
            }
        }
        return establishmentName
    } catch (err) {
        throw(err)
    }
}

// Returns a map which is used to get a coach profile given its id.
export const fetchCoaches = async (offers: Offer[]): Promise<{ [coach: number]: { name: string, photo: string } }> => {
    const coachesParams = offers.reduce((prev, cur) => {
        return prev+","+cur.coach
    }, "")
    try {
        const res = await getRequest(_coachPath+"?", [["id__in", coachesParams]])
        const lCoaches = (await res.json() as listCoachesResponse)
        const coaches = lCoaches.results
        var coachName: { [coach: number]: { name:string,photo:string } } = {}
        for (let i = 0; i < coaches.length; i++) {
            if (coachName[coaches[i].id] === undefined) {
                coachName = { ...coachName, [coaches[i].id]: coaches[i].user }
            }
        }
        return coachName
    } catch (err) {
        throw(err)
    }
}

// Returns a map which is used to get a member profile given an offer.
export const fetchMembersByOffer = async (offer: number): Promise<User[]> => {
    const bookings = await fetchBookingsByOffer(offer)
    if (bookings.length === 0){
        return []
    }
    const membersParams = bookings.reduce((prev, cur) => {
        return prev+","+cur.member
    }, "")
    try {
        const res = await getRequest(_memberPath+"?", [["id__in", membersParams]])
        const lMembers = (await res.json() as listMembersResponse)
        const members = lMembers.results
        return members
    } catch (err) {
        throw(err)
    }
}
