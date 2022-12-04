import Search from "antd/es/input/Search";
import Title from "antd/lib/typography/Title";
import * as React from 'react';
import { Calendar } from "./components/calendar";
import { todayDate } from "./utils";

const App = () => {
    const today = todayDate()
    const [activeDay, setActiveDay] = React.useState(today)
    return (
        <div>
            <Search onSearch={(value: string) => {setActiveDay(value); }}>
                
            </Search>
            <Title level={4}>
                BSport Calendar day for {activeDay}
            </Title>
            <Calendar date={ activeDay} />
        </div>

    )
}
export default App