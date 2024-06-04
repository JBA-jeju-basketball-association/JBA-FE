import React from 'react';
import {ko} from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import style from "./CustomDatePicker.module.css"

type Props = {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const CustomDatePicker = ({startDate, setStartDate, endDate, setEndDate}:Props) => {

    let currentDate:Date = new Date();
    let nextDay:Date = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    return (
        <div className={style.datepicker}>
            <DatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(update: [Date, Date]): void => {
                    setStartDate(update[0])
                    setEndDate(update[1])
                }}
                selected={startDate}
                toggleCalendarOnIconClick
                dateFormat="yyyy.MM.dd (eee)"
                selectsRange={true}
                locale={ko}
                showPopperArrow={false}
                customInput={
                    <input className={style.inputStyle}/>
                }
            />
        </div>
    );
};

