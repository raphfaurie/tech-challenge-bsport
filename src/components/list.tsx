import Title from "antd/lib/typography/Title";
import * as React from 'react';
type ListProps = {
    id: number,
    name: string,
    level: number,
    location: string,
    coach:string,
}


const List = (props:ListProps) => {
    return (
        <div>
        <Title level={3}>
            {props.id} & {props.name} & level : {props.level} & place : {props.location} & coach = {props.coach}
        </Title>
        </div>
    )
}

export { List };
