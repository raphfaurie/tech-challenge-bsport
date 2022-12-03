import Title from "antd/lib/typography/Title";
import * as React from 'react';
import { Calendar } from "./components/calendar";
import { todayDate } from "./utils";

const App = () => {
    const today = todayDate()
    const [activeDay, setActiveDay] = React.useState(today)
    return (
        <div>
            <Title level={4}>
                BSport Calendar day for {today}
            </Title>
            <Calendar date={ activeDay} />
        </div>

    )
}
export default App