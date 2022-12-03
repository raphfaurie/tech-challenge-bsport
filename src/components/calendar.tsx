import * as React from 'react'
import {
    fetchCoaches,
    fetchLocation,
    fetchMetaActivity,
    fetchOfferByDate,
    Offer
} from '../bsportAPI'
import { List } from './list'
type CalendarProps = {
    date:string
}
export const Calendar = (props: CalendarProps) => {
    const [offers, setOffers] = React.useState<Offer[]>()
    const [loading, setLoading] = React.useState(true)
    const [mapMetaActivities, setMapMetaActivities] = React.useState<{ [metaActivity: number]: string }>({})
    const [mapLocation, setMapLocation] = React.useState<{ [establishment: number]: string }>({})
    const [mapCoach, setMapCoach] = React.useState<{ [coach: number]: string }>({})
    React.useEffect(()=> {
        async function fetchOffers() {
            const fetchedOffers = await fetchOfferByDate(props.date, props.date)
            const metaActivities = await fetchMetaActivity(fetchedOffers)
            const locations = await fetchLocation(fetchedOffers)
            const coaches = await fetchCoaches(fetchedOffers)
            setLoading(false)
            setOffers(fetchedOffers)
            setMapMetaActivities(metaActivities)
            setMapLocation(locations)
            setMapCoach(coaches)
            
        }
        if (loading) {
            fetchOffers()
        }
    })
    return (
        <div>
        {!loading && offers && (
                Object.values(offers).map((offer, index) => {
                return (
                    <List id={offer.id}
                        name={mapMetaActivities[offer.meta_activity]}
                        level={offer.level}
                        location={mapLocation[offer.establishment]}
                        coach = {mapCoach[offer.coach]}
                        key={index} />
                )
            })
            )}
    </div>
    )
}