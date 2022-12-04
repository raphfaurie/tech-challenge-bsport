import { Booking, getBookingsResponse, getOfferResponse, listCoaches, listEstablishments, listMembers, listMetaActivities, Offer, User } from "./types";
import { getRequest } from "./utils";





const _offerPath = "/offer/"
const _bookingPath = "/booking/"
const _metaActivityPath = "/meta-activity/"
const _establishmentPath = "/establishment/"
const _coachPath = "/coach/"
const _memberPath = "/member/"


export const fetchOfferByDate = async (minDate: string, maxDate: string): Promise<Offer[]> => {
    const offerParams = [["min_date",minDate],["max_date",maxDate],["company","6"]]
    try {
        const res =await getRequest(_offerPath+"?",offerParams)
        const offerList = (await res.json() as getOfferResponse).results
        return offerList
    } catch (err) {
        throw(err)
    }
}

export const fetchBookingsByOffer = async(offer: number): Promise<Booking[]> => {
    const bookingParams = [["offer", offer.toString()]]
    try {
        const res = await getRequest(_bookingPath+"?", bookingParams)
        const bookings = (await res.json() as getBookingsResponse)
        return bookings.results
    } catch (err) {
        throw(err)
    }
    
}


export const fetchMetaActivities = async (offers: Offer[]) => {
    const metaActivitiesParams = offers.reduce((prev, cur) => {
        return prev+","+cur.meta_activity
    }, "")
    try {
        const res = await getRequest(_metaActivityPath+"?", [["id__in", metaActivitiesParams]])
        const lMetaActivities = (await res.json() as listMetaActivities)
        const metaActivities = lMetaActivities.results
        var metaActivitiesName: { [metaActivity: number]: string } = {}
        for (let i = 0; i < metaActivities.length; i++) {
            if (metaActivitiesName[metaActivities[i].id] === undefined) {
                metaActivitiesName = { ...metaActivitiesName, [metaActivities[i].id]:metaActivities[i].name  }
            }
        }
        return metaActivitiesName
    } catch (e) {
        console.log(e)
    }
}


export const fetchEstablishments= async (offers: Offer[]) => {
    const establishmentParams = offers.reduce((prev, cur) => {
        return prev+","+cur.establishment
    }, "")
    try {
        const res = await getRequest(_establishmentPath+"?", [["id__in", establishmentParams]])
        const lEstablishment = (await res.json() as listEstablishments)
        const establishments = lEstablishment.results
        var establishmentName: { [establishment: number]: string } = {}
        for (let i = 0; i < establishments.length; i++) {
            if (establishmentName[establishments[i].id] === undefined) {
                establishmentName = { ...establishmentName, [establishments[i].id]:establishments[i].title  }
            }
        }
        return establishmentName
    } catch (e) {
        console.log(e)
    }
}

export const fetchCoaches = async (offers: Offer[]) => {
    const coachesParams = offers.reduce((prev, cur) => {
        return prev+","+cur.coach
    }, "")
    try {
        const res = await getRequest(_coachPath+"?", [["id__in", coachesParams]])
        const lCoaches = (await res.json() as listCoaches)
        const coaches = lCoaches.results
        var coachName: { [coach: number]: { name:string,photo:string } } = {}
        for (let i = 0; i < coaches.length; i++) {
            if (coachName[coaches[i].id] === undefined) {
                coachName = { ...coachName, [coaches[i].id]: coaches[i].user }
            }
        }
        return coachName
    } catch (e) {
        console.log(e)
    }
}

export const fetchMembersByOffer = async (offer: number): Promise<User[]> => {
    const bookings = await fetchBookingsByOffer(offer)
    if (bookings.length === 0){
        return []
    }
    
    const membersParams = bookings.reduce((prev, cur) => {
        return prev+","+cur.member
    }, "")
    console.log(bookings[0])
    try {
        const res = await getRequest(_memberPath+"?", [["id__in", membersParams]])
        const lMembers = (await res.json() as listMembers)
        const members = lMembers.results
        return members
    } catch (e) {
        console.log(e)
    }
}
