import React, {useEffect} from 'react';
import style from "./PostScheduleBox.module.css"
import {
    place,
    postCompetitionSchedule,
    postCompetitionScheduleRow
} from "../../../shared/type/CompetitionType";
import {CustomDatePickerWithTime} from "../../../features/datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {divisionType} from "../../../shared/model/DivisionOptions";
import {CheckBox} from "../../../shared/ui";


type Props = {
    index:number;
    postCompetitionScheduleList: postCompetitionSchedule[];
    setPostCompetitionScheduleList: React.Dispatch<React.SetStateAction<postCompetitionSchedule[]>>;
    places:place[];
}
export const PostScheduleBox = ({places, index, postCompetitionScheduleList, setPostCompetitionScheduleList}:Props) => {
    let list:{place:string, rowList:postCompetitionScheduleRow[]}[] = [];
    const setGameNumber = () => {
        list = [];
        for (let k:number = 0; k < places.length; k++) {
            list.push({place:places[k].placeName, rowList:[]})
        }
        for (let i:number = 0; i < postCompetitionScheduleList.length; i++) {
            for (let j:number = 0; j < postCompetitionScheduleList[i].postCompetitionScheduleRow.length; j++) {
                const data:postCompetitionScheduleRow = postCompetitionScheduleList[i].postCompetitionScheduleRow[j];
                for (let e:number = 0; e < list.length; e++) {
                    if (list[e].place === data.place) {
                        list[e].rowList.push(data)
                    }
                }
            }
        }

        for (let r:number = 0; r < postCompetitionScheduleList.length; r++) {
            for (let t: number = 0; t < postCompetitionScheduleList[r].postCompetitionScheduleRow.length; t++) {
                let num:number = 1;
                const target:postCompetitionScheduleRow = postCompetitionScheduleList[r].postCompetitionScheduleRow[t]
                for (let y:number = 0; y < list.length; y++) {

                    if (target.place === list[y].place) {
                        for (let u:number = 0; u < list[y].rowList.length; u++) {
                            // @ts-ignore
                            if (target.startDate && list[y].rowList[u].startDate && (new Date(target.startDate)?.getTime() > new Date(list[y].rowList[u].startDate).getTime())) {
                                num++
                            }
                        }
                    }

                }
                setPostCompetitionScheduleList(prevState => {
                    const scheduleList:postCompetitionSchedule[] = [...prevState];
                    scheduleList[r].postCompetitionScheduleRow[t].gameNumber = num;
                    return scheduleList;
                })
            }
        }
    }
    const plusHandler = () => {
        const initial:postCompetitionScheduleRow = {
            gameNumber: 1,
            startDate: new Date(),
            floor: "",
            place: places[0].placeName,
            homeName: "",
            awayName: "",
            state5x5: true
        }
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState]
            scheduleList[index].postCompetitionScheduleRow.push(initial);
            // scheduleList[index].postCompetitionScheduleRow =[...scheduleList[index].postCompetitionScheduleRow, initial];
            return scheduleList
        })
        setGameNumber()
    }

    const minusHandler = (rowIndex:number):void => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow = scheduleList[index].postCompetitionScheduleRow
                .filter((item:postCompetitionScheduleRow, index:number) => rowIndex !== index)
            return scheduleList
        })
        setGameNumber()
    }

    const setStartDate = (date:Date | null, rowIndex:number) => {
          setPostCompetitionScheduleList(prevState => {
                const scheduleList:postCompetitionSchedule[] = [...prevState];
                scheduleList[index].postCompetitionScheduleRow[rowIndex].startDate = date;
                return scheduleList
        })
        setGameNumber()
    }

    const floorHandler = (event:  React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow[rowIndex].floor = event.target.value;
            return scheduleList
        })
    }


    const placeOptions:divisionType[] = [];
    if (places) {
        places.forEach((p:place) => placeOptions.push({value:p.placeName, label:p.placeName}))
    }

    const placeHandler = (value:any, rowIndex:number) => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow[rowIndex].place = value.value;
            return scheduleList
        })
        setGameNumber()
    }

    const homeNameHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow[rowIndex].homeName = e.target.value;
            return scheduleList
        })
    }

    const awayNameHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow[rowIndex].awayName = e.target.value;
            return scheduleList
        })
    }

    const is5x5Handler = (rowIndex:number, isChecked:boolean) => {
        setPostCompetitionScheduleList(prevState => {
            const scheduleList:postCompetitionSchedule[] = [...prevState];
            scheduleList[index].postCompetitionScheduleRow[rowIndex].state5x5 = isChecked;
            return scheduleList
        })
    }

    return (
        <div className={style.PostScheduleBox}>
            <p>{postCompetitionScheduleList[index]?.division}</p>

                {postCompetitionScheduleList[index]?.postCompetitionScheduleRow?.map((r:postCompetitionScheduleRow, rowIndex:number) => {
                    return (
                        <div className={style.rowArea} key={rowIndex}>
                            <div className={style.row}>
                                <div className={style.gameNumber}>
                                    <p>{postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].gameNumber}</p>
                                </div>
                                <CustomDatePickerWithTime
                                    startDate={postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].startDate}
                                    setStartDate={setStartDate}
                                    rowIndex={rowIndex}
                                />
                                <div className={style.floor}>
                                    <input
                                        type={"text"}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => floorHandler(event, rowIndex)}
                                        placeholder={"floor"}
                                        value={postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].floor || ""}
                                    />
                                </div>
                                <div className={style.placeArea}>
                                    {places &&
                                        <Select
                                            components={makeAnimated()}
                                            options={placeOptions}
                                            closeMenuOnSelect={true}
                                            placeholder={"장소"}
                                            className={style.place}
                                            onChange={(value) => placeHandler(value, rowIndex)}
                                            value={{value:postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].place, label:postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].place}}
                                        />
                                    }
                                </div>
                                <div className={style.nameArea}>
                                    <input type={"text"}
                                           onChange={(e:React.ChangeEvent<HTMLInputElement>) => homeNameHandler(e,rowIndex)}
                                           placeholder={"홈팀명"}
                                           value={postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].homeName || ""}
                                    />
                                    <p>VS</p>
                                    <input type={"text"}
                                           onChange={(e:React.ChangeEvent<HTMLInputElement>) => awayNameHandler(e,rowIndex)}
                                           placeholder={"어웨이팀명"}
                                           value={postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].awayName || ""}
                                    />
                                </div>
                                <div className={style.checkBox}>
                                    <CheckBox isChecked={!postCompetitionScheduleList[index].postCompetitionScheduleRow[rowIndex].state5x5}
                                              setFC={(checked:boolean) => is5x5Handler(rowIndex, !checked)}
                                              content={"3X3"}
                                    />
                                </div>
                            </div>
                            <button onClick={() => minusHandler(rowIndex)} className={style.minusBtn}>-</button>
                        </div>
                    );
                })}
            <button onClick={() => plusHandler()} className={style.plusBtn}>+</button>
        </div>
    );
};
