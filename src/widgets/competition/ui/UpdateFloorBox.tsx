import React from 'react';
import style from "./UpdateFloorBox.module.css"
import {AddResultRow} from "./AddResultRow";
import {competitionResult, competitionResultList} from "../../../shared/type/CompetitionType";

type Props = {
    resultList:competitionResultList[];
    index:number;
    setResultList:React.Dispatch<React.SetStateAction<competitionResultList[]>>;
    divisions:string[];
}
export const UpdateFloorBox = ({resultList,setResultList,index,divisions}:Props) => {

    const initialResult:competitionResultList = {
        floor:"경기",
        competitionResult: [{
            division:"",
            startTime:new Date(),
            homeName: " ",
            homeScore:0,
            awayName: " ",
            awayScore:0,
            fileUrl:"",
            fileName: ""
        }]
    }

    const plusButtonHandler = () => {
        setResultList(prevState => [...prevState, initialResult])
    }

    const minusButtonHandler = ():void => {
        if (resultList.length > 1) {
        setResultList(prevState => prevState.filter((item:competitionResultList,itemIndex:number):boolean => (itemIndex !== index)))
        }
    }

    const changeFloorHandler = (value:string):void => {
        setResultList(prevState => {
            const updatedResultList = [...prevState];
            updatedResultList[index].floor = value;
            return updatedResultList;
        });
    }
    return (
        <div className={style.FloorBox}>
            <div className={style.titleArea}>

                <input
                    type={"text"}
                    placeholder={resultList[index]?.floor}
                    value={resultList[index]?.floor}
                    onChange={(e)=> changeFloorHandler(e.target.value)}
                />

                <button onClick={() => minusButtonHandler()}>-</button>
                {resultList.length === index + 1 ? <button onClick={() => plusButtonHandler()}>+</button> : ""}
            </div>
            <div className={style.inputArea}>
                {resultList[index]?.competitionResult.map((r:competitionResult,resultIndex:number) => {
                    return <AddResultRow key={resultIndex} index={index} resultIndex={resultIndex} resultList={resultList} setResultList={setResultList} divisions={divisions && divisions}/>
                })}
            </div>

        </div>
    );
};
