import React from 'react';
import style from "./PostResultBox.module.css"
import {
    divisionType,
    place, postCompetitionResult, postResultRequestRows
} from "../../../shared/type/CompetitionType";
import {CustomDatePickerWithTime} from "../../../features/datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {CheckBox} from "../../../shared/ui";
import fetchResultAttachedFile from "../api/FetchResultAttachedFile";



type Props = {
    index:number;
    postCompetitionResult: postCompetitionResult[];
    setPostCompetitionResult: React.Dispatch<React.SetStateAction<postCompetitionResult[]>>;
    places:place[];
}
export const PostResultBox = ({places, index, postCompetitionResult, setPostCompetitionResult}:Props) => {
    let list:{place:string, rowList:postResultRequestRows[]}[] = [];
    const setGameNumber = () => {
        list = [];
        for (let k:number = 0; k < places.length; k++) {
            list.push({place:places[k].placeName, rowList:[]})
        }
        for (let i:number = 0; i < postCompetitionResult.length; i++) {
            for (let j:number = 0; j < postCompetitionResult[i].postResultRequestRows.length; j++) {
                const data:postResultRequestRows = postCompetitionResult[i].postResultRequestRows[j];
                for (let e:number = 0; e < list.length; e++) {
                    if (list[e].place === data.place) {
                        list[e].rowList.push(data)
                    }
                }
            }
        }

        for (let r:number = 0; r < postCompetitionResult.length; r++) {
            for (let t: number = 0; t < postCompetitionResult[r].postResultRequestRows.length; t++) {
                let num:number = 1;
                const target:postResultRequestRows = postCompetitionResult[r].postResultRequestRows[t]
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
                setPostCompetitionResult(prevState => {
                    const resultList:postCompetitionResult[] = [...prevState];
                    resultList[r].postResultRequestRows[t].gameNumber = num;
                    return resultList;
                })
            }
        }
    }
    const plusHandler = () => {
        let prevStartDate: number | undefined;
        let row = postCompetitionResult[index].postResultRequestRows;
        let firstLastDate;
        let secondLastDate;
        if (row.length > 1) {
            firstLastDate = row[row.length - 1].startDate?.getTime() ?? new Date().getTime();
            secondLastDate = row[row.length - 2].startDate?.getTime() ?? new Date().getTime();
            prevStartDate = (2 * firstLastDate) - secondLastDate
        }else if (row.length == 1){
            firstLastDate = (row[row.length - 1].startDate?.getTime() ?? new Date().getTime()) + 3600000;
            prevStartDate = firstLastDate;
        }else {
            prevStartDate = new Date().getTime();
        }
        const initial:postResultRequestRows = {
            competitionResultId: null,
            gameNumber: 1,
            startDate: new Date(prevStartDate ?? new Date().getTime()),
            floor: "",
            place: places[0].placeName,
            homeName: "",
            homeScore: null,
            awayName: "",
            awayScore: null,
            filePath: "",
            fileName: "",
            state5x5: true
        }
        setPostCompetitionResult(prevState => {
            const scheduleList:postCompetitionResult[] = [...prevState]
            scheduleList[index].postResultRequestRows.push(initial);
            return scheduleList
        })
        setGameNumber()
    }

    const minusHandler = (rowIndex:number):void => {
        setPostCompetitionResult(prevState => {
            const ResultList:postCompetitionResult[] = [...prevState];
            ResultList[index].postResultRequestRows = ResultList[index].postResultRequestRows
                .filter((item:postResultRequestRows, index:number) => rowIndex !== index)
            return ResultList
        })
        setGameNumber()
    }

    const setStartDate = (date:Date | null, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const scheduleList:postCompetitionResult[] = [...prevState];
            scheduleList[index].postResultRequestRows[rowIndex].startDate = date;
            return scheduleList;
        })
        setGameNumber()
    }

    const floorHandler = (event:  React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].floor = event.target.value;
            return resultList;
        })
    }


    const placeOptions:divisionType[] = [];
    if (places) {
        places.forEach((p:place) => placeOptions.push({value:p.placeName, label:p.placeName}))
    }

    const placeHandler = (value:any, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].place = value.value;
            return resultList;
        })
        setGameNumber()
    }

    const homeNameHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].homeName = e.target.value;
            return resultList;
        })
    }

    const homeScoreHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].homeScore = parseInt(e.target.value);
            return resultList;
        })
    }

    const awayNameHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].awayName = e.target.value;
            return resultList
        })
    }

    const awayScoreHandler = (e:React.ChangeEvent<HTMLInputElement>, rowIndex:number) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].awayScore = parseInt(e.target.value);
            return resultList;
        })
    }

    function fileHandler(e: React.ChangeEvent<HTMLInputElement>, rowIndex:number):void {
        if (e.target.files) {
            fetchResultAttachedFile(e.target.files[0])
                .then(res=> {
                    setPostCompetitionResult(prevState =>  {
                        const resultList:postCompetitionResult[] = [...prevState]
                        resultList[index].postResultRequestRows[rowIndex].fileName = res.data.data[0]?.fileName
                        resultList[index].postResultRequestRows[rowIndex].filePath = res.data.data[0]?.fileUrl
                        return resultList
                    })
                })

        }

    }

    const is5x5Handler = (rowIndex:number, isChecked:boolean) => {
        setPostCompetitionResult(prevState => {
            const resultList:postCompetitionResult[] = [...prevState];
            resultList[index].postResultRequestRows[rowIndex].state5x5 = isChecked;
            return resultList
        })
    }

    return (
        <div className={style.PostScheduleBox}>
            <p>{postCompetitionResult[index]?.division}</p>

            {postCompetitionResult[index]?.postResultRequestRows?.map((r:postResultRequestRows, rowIndex:number) => {
                return (
                    <div className={style.rowArea} key={rowIndex}>
                        <div className={style.row}>
                            <div className={style.gameNumber}>
                                <p>{postCompetitionResult[index].postResultRequestRows[rowIndex].gameNumber}</p>
                            </div>
                            <CustomDatePickerWithTime
                                startDate={postCompetitionResult[index].postResultRequestRows[rowIndex].startDate}
                                setStartDate={setStartDate}
                                rowIndex={rowIndex}
                            />
                            <div className={style.floor}>
                                <input
                                    type={"text"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => floorHandler(event, rowIndex)}
                                    placeholder={"floor"}
                                    value={postCompetitionResult[index].postResultRequestRows[rowIndex].floor || ""}
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
                                        value={{
                                            value: postCompetitionResult[index].postResultRequestRows[rowIndex].place,
                                            label: postCompetitionResult[index].postResultRequestRows[rowIndex].place
                                        }}
                                    />
                                }
                            </div>
                            <div className={style.nameArea}>
                                <input type={"text"}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => homeNameHandler(e, rowIndex)}
                                       placeholder={"홈팀명"}
                                       value={postCompetitionResult[index].postResultRequestRows[rowIndex].homeName || ""}
                                       className={style.nameInputBox}
                                />
                                <input
                                    type={"number"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => homeScoreHandler(e, rowIndex)}
                                    placeholder={"점수"}
                                    value={postCompetitionResult[index].postResultRequestRows[rowIndex].homeScore || ""}
                                    className={style.scoreInputBox}
                                />
                                <p>VS</p>
                                <input
                                    type={"number"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => awayScoreHandler(e, rowIndex)}
                                    placeholder={"점수"}
                                    value={postCompetitionResult[index].postResultRequestRows[rowIndex].awayScore || ""}
                                    className={style.scoreInputBox}
                                />
                                <input type={"text"}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => awayNameHandler(e, rowIndex)}
                                       placeholder={"어웨이팀명"}
                                       value={postCompetitionResult[index].postResultRequestRows[rowIndex].awayName || ""}
                                       className={style.nameInputBox}
                                />
                            </div>
                            <div className={style.fileArea}>
                                <label htmlFor={"file" + index + "&" + rowIndex}>
                                    <div
                                        className={style.btnUpload}>{postCompetitionResult[index].postResultRequestRows[rowIndex].fileName === "" || postCompetitionResult[index].postResultRequestRows[rowIndex].fileName === null ? "파일 업로드" : postCompetitionResult[index].postResultRequestRows[rowIndex].fileName}</div>
                                </label>
                                <input type="file" id={"file" + index + "&" + rowIndex} multiple={false}
                                       className={style.file}
                                       onChange={(e) => fileHandler(e, rowIndex)}/>
                            </div>
                            <div className={style.checkBox}>
                                <CheckBox
                                    isChecked={!postCompetitionResult[index].postResultRequestRows[rowIndex].state5x5}
                                    setFC={(checked: boolean) => is5x5Handler(rowIndex, !checked)}
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
