import { Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import * as React from 'react'
import {
    fetchCoaches,
    fetchEstablishments,
    fetchMetaActivities,
    fetchOfferByDate
} from '../service/bsportAPI'
import { Offer } from '../types'
import { OfferListItem } from './offerListItem'
type CalendarProps = {
    date: string
}
export const Calendar = (props: CalendarProps) => {
    const [date, setDate] = React.useState(props.date)
    const [loading, setLoading] = React.useState(true)
    const [offers, setOffers] = React.useState<Offer[]>()
    const [mapMetaActivities, setMapMetaActivities] = React.useState<{ [metaActivity: number]: string }>({})
    const [mapLocation, setMapLocation] = React.useState<{ [establishment: number]: string }>({})
    const [mapCoach, setMapCoach] = React.useState<{ [coach: number]: { name: string, photo: string } }>({})
    // eslint-disable-next-line
    React.useEffect(() => {
        if (props.date !== date) {
            setDate(props.date)
            setLoading(true)
        }
        // Fetches the useful informations of the day and updates the state.
        // TO DO (optim): pass the actual map to the fetch functions and look only for needed id.
        async function fetchOffers() {
            try {
                const fetchedOffers = await fetchOfferByDate(props.date, props.date)
                const metaActivities = await fetchMetaActivities(fetchedOffers)
                const locations = await fetchEstablishments(fetchedOffers)
                const coaches = await fetchCoaches(fetchedOffers)
                setLoading(false)
                setOffers(fetchedOffers)
                setMapMetaActivities(metaActivities)
                setMapLocation(locations)
                setMapCoach(coaches)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
            
        }
        // Get information only when needed.
        if (loading) {
            fetchOffers()
            setDate(date)
        }
    })
    return (
        <div>
        {!loading && offers && (
                Object.values(offers).map((offer, index) => {
                return (
                    <OfferListItem
                        offer={offer.id}
                        activityName={mapMetaActivities[offer.meta_activity]}
                        level={offer.level}
                        location={mapLocation[offer.establishment]||""}
                        coach={mapCoach[offer.coach]}
                        time={"Starting at " + offer.date_start.slice(11, 19) + " for " + offer.duration_minute + "min"}
                        bookings={offer.bookings}
                        key={index} />
                )
            })
            )}
            {loading && (
                <div>
                <Title>
                    Looking for the lessons.
                </Title>
                    <Spin spinning={true} />
                </div>
        )}
    </div>
    )
}