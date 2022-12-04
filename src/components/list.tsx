import { Image } from "antd";
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import { User } from "../types";
import { OModal } from "./modal";
type OfferListItemProps = {
    offer: number,
    name: string,
    level: number,
    location: string,
    coach: User,
    time: string,
    bookings:number[],
}


const OfferListItem = (props: OfferListItemProps) => {
    return (
        <div>
        <Text>
            Lesson : {props.name} <br></br>
            Level : {props.level} <br></br>
            Place : {props.location} <br></br>
            Coach = {props.coach.name} <br></br>
            {props.time}
            </Text>
            <Image src={props.coach.photo} height={80} width={"50"}  />
            <OModal offer={props.offer}/>
        </div>
    )
}

export { OfferListItem };
