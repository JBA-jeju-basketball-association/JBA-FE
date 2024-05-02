import React from 'react';
import style from "./Result.module.css"
import {competitionResult, competitionResultList} from "../../../shared/type/CompetitionResultType";
import {CustomDatePickerWithTime} from "../../../features/datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";
import fetchResultAttachedFile from "../api/FetchResultAttachedFile";

type Props = {
    index:number;
    resultIndex:number;
    resultList:competitionResultList[];
    setResultList: React.Dispatch<React.SetStateAction<competitionResultList[]>>;
    divisions:string[];
}
export const Result = ({index, resultIndex, resultList, setResultList, divisions}:Props) => {

    const setStartDate = (date:Date) => {
        setResultList(prevState => {
            const updateResultList:competitionResultList[] = [...prevState];
            updateResultList[index].competitionResult[resultIndex].startTime = date;
            return updateResultList
        })
    }

    let resultDivisions:{value:string, label:string}[] = DivisionOptions;
    if (divisions) {
        resultDivisions = DivisionOptions.filter(d=>divisions.includes(d.value))
    }






    const plusButtonHandler = () => {
        setResultList(prevState => {
            const initialData:competitionResult =  {
                division:null,
                startTime:new Date(),
                homeName: "",
                homeScore:0,
                awayName: "",
                awayScore:0,
                fileUrl:"",
                fileName: ""
            }
            const updateResultList:competitionResultList[] = [...prevState];
            updateResultList[index].competitionResult.push(initialData)
            return updateResultList;
        })
    }

    const minusButtonHandler = ():void => {
        if (resultList[index].competitionResult.length > 1) {
            setResultList(prevState => {
                const updateResultList:competitionResultList[] = [...prevState];
                updateResultList[index].competitionResult = updateResultList[index].competitionResult
                    .filter((item:competitionResult, itemIndex:number):boolean => itemIndex !== resultIndex)
                return updateResultList;
            })
        }
    }

    const addTeamName = (isHome:boolean, name:string):void => {
        setResultList(prevState => {
            const updateResultList: competitionResultList[] = [...prevState];
            if (isHome) {
                updateResultList[index].competitionResult[resultIndex].homeName = name;
                return updateResultList
            }else {
                updateResultList[index].competitionResult[resultIndex].awayName = name;
                return updateResultList
            }
        })
    }

    const addScore = (isHome:boolean, score:number):void => {
        setResultList(prevState => {
            const updateResultList: competitionResultList[] = [...prevState];
            if (isHome) {
                updateResultList[index].competitionResult[resultIndex].homeScore = score;
                return updateResultList
            }else {
                updateResultList[index].competitionResult[resultIndex].awayScore = score;
                return updateResultList
            }
        })
    }

    function divisionHandler(value:{value:string, label:string}):void {
        console.log(value)
        setResultList(prevState => {
            const updateResultList:competitionResultList[] = [...prevState];
            updateResultList[index].competitionResult[resultIndex].division = value.value
            console.log(resultIndex)
            return updateResultList
        })
    }

    function fileHandler(e: React.ChangeEvent<HTMLInputElement>):void {
        if (e.target.files) {
            fetchResultAttachedFile(e.target.files[0])
                .then(res=> {
                    console.log(res)
                    setResultList(prevState =>  {
                        const updateResultList:competitionResultList[] = [...prevState]
                        console.log(updateResultList[index].competitionResult)
                        console.log(resultIndex)
                        updateResultList[index].competitionResult[resultIndex].fileName = res.data.data[0]?.fileName
                        updateResultList[index].competitionResult[resultIndex].fileUrl = res.data.data[0]?.fileUrl
                        return updateResultList
                    })
                })

        }

    }

    return (
        <div className={style.Result}>
            <div className={style.leftSide}>
                <CustomDatePickerWithTime startDate={resultList[index].competitionResult[resultIndex].startTime}
                                          setStartDate={setStartDate}/>
                <Select
                    components={makeAnimated()}
                    options={resultDivisions}
                    closeMenuOnSelect={true}
                    placeholder={"종별"}
                    className={style.select}
                    onChange={(value:any) => divisionHandler(value)}
                />
                <div className={style.inputArea}>
                    <p>HOME</p>
                    <input type={"text"} placeholder={"팀명"} className={style.nameInput} onChange={(e) => addTeamName(true, e.target.value)} value={resultList[index].competitionResult[resultIndex].homeName}/>
                    <input type={"number"} placeholder={"점수"} className={style.scoreInput} onChange={(e) => addScore(true, parseInt(e.target.value))} value={resultList[index].competitionResult[resultIndex].homeScore}/>
                </div>
                <div className={style.inputArea}>
                    <p>AWAY</p>
                    <input type={"text"} placeholder={"팀명"} className={style.nameInput} onChange={(e) => addTeamName(false, e.target.value)} value={resultList[index].competitionResult[resultIndex].awayName}/>
                    <input type={"number"} placeholder={"점수"} className={style.scoreInput} onChange={(e) => addScore(false, parseInt(e.target.value))} value={resultList[index].competitionResult[resultIndex].awayScore}/>
                </div>
                <div>
                    <label htmlFor={"file"+index+"&"+resultIndex}>
                        <div className={style.btnUpload}>{resultList[index].competitionResult[resultIndex].fileName === "" ? "파일 업로드" : resultList[index].competitionResult[resultIndex].fileName }</div>
                    </label>
                    <input type="file" id={"file"+index+"&"+resultIndex} multiple={false} className={style.file} onChange={(e) => fileHandler(e)}/>
                </div>
            </div>
            <div className={style.rightSide}>
                {resultList[index].competitionResult.length === resultIndex + 1 ? <button onClick={() => plusButtonHandler()}>+</button> : ""}
                {resultList[index].competitionResult.length > 1 ? <button onClick={()=> minusButtonHandler()}>-</button> : ""}
            </div>

        </div>
    );
};
