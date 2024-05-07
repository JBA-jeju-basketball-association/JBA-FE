import React from 'react';
import {ko} from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import style from "./CustomDatePickerWithTime.module.css"

type Props = {
    startDate: Date | null;
    setStartDate(date:Date | null): void
}

export const CustomDatePickerWithTime = ({startDate, setStartDate}:Props) => {

    let currentDate:Date = new Date();
    let nextDay:Date = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    const filterPassedTime = (time:any):boolean => {
        const currentDate:Date = new Date();
        const selectedDate:Date = new Date(time);

        return currentDate.getTime() > selectedDate.getTime();
    };

    return (
        <div  className={style.datepicker}>
            <DatePicker
                startDate={startDate}
                onChange={(date)=>setStartDate(date)}
                selected={startDate}
                showTimeSelect
                toggleCalendarOnIconClick
                dateFormat="yyyy. M. d. aa h:mm "
                locale={ko}
                showPopperArrow={false}
                filterTime={filterPassedTime}
                customInput={
                    <input className={style.inputStyle}/>
                }
            />
        </div>
    );
};

