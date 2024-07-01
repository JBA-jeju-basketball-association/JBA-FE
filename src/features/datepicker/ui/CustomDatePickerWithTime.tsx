import React from 'react';
import {ko} from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import style from "./CustomDatePickerWithTime.module.css"

type Props = {
    startDate: Date | null;
    setStartDate(date:Date | null, rowIndex:number): void;
    rowIndex: number;
}

export const CustomDatePickerWithTime = ({startDate, setStartDate, rowIndex}:Props) => {

    return (
        <div className={style.datepicker}>
            {startDate &&
                <DatePicker
                    startDate={startDate}
                    onChange={(date) => setStartDate(date, rowIndex)}
                    selected={new Date(startDate)}
                    showTimeSelect
                    timeIntervals={10}
                    toggleCalendarOnIconClick
                    dateFormat="yyyy. M. d. aa h:mm "
                    locale={ko}
                    showPopperArrow={false}
                    customInput={
                        <input className={style.inputStyle}/>
                    }
                />
            }

        </div>
    );
};

