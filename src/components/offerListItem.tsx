import { Image } from "antd";
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import { User } from "../types";
import { OModal } from "./offerModal";

type OfferListItemProps = {
    // Id of the offer.
    offer: number,
    // Activity display name.
    activityName: string,
    // Lesson level.
    level: number,
    // Display name of the place where the lesson takes place.
    location: string,
    // Teacher profile.
    coach: User,
    // Date and duration information.
    time: string,
    // List of the bookings, useful to fetch the participant names.
    bookings:number[],
}
const OfferListItem = (props: OfferListItemProps) => {
    return (
        <div style={{
            marginBottom: 32,
            marginTop: 32,
            padding:13,
        }}>
        <Text>
            Lesson : {props.activityName} <br></br>
            Level : {props.level} <br></br>
            Place : {props.location} <br></br>
            Coach = {props.coach.name} <br></br>
            {props.time}
            </Text>
            <Image src={props.coach.photo} height={80} width={80}  />
            <OModal offer={props.offer}/>
        </div>
    )
}

export { OfferListItem };
