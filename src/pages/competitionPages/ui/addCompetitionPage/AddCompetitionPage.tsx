import * as React from 'react';
import PageTitle from "../../../../shared/ui/pageTitle/PageTitle";
import style from "./AddCompetitionPage.module.css"
import {useState} from "react";
import AddCompetitionLabel from "../../../../shared/ui/addCompetitionLabel/AddCompetitionLabel";
import Select, {MultiValue} from "react-select";
import makeAnimated from "react-select/animated";
import CustomDatePicker from "../../../../shared/ui/datepicker/CustomDatePicker";
import PlaceArea from "../../../../entities/competition/ui/PlaceArea";
import AddFiles from "../../../../features/competition/ui/addFiles/AddFiles";

export type place = {
    name : string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
}


const AddCompetitionPage:React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [division, setDivision] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [places, setPlaces] = useState<place[]>([]);
    const [relatedURL, setRelatedUrl] = useState<string | null>(null);
    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    type value = {
        label: string;
        value: string;
    }

    const divisionHandler = (values:MultiValue<any>):void => {
        setDivision([])
        values.map(
            (item:value):void => {
                setDivision(prevState => [...prevState,item.value])
            }
        )
    }
    const options:{value:string, label:string}[] = [
        {value: "element", label: "초등"},
        {value: "middle", label: "중등"},
        {value: "high", label: "고등"},
        {value: "university", label: "대학"},
        {value: "division3", label: "디비전3"},
        {value: "division4", label: "디비전4"},
        {value: "forties", label: "40대"},
        {value: "rookie", label: "루키"},
    ]


    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회등록"/>
            <form className={style.container} onSubmit={(e: React.FormEvent<HTMLFormElement>) => formSubmitHandler(e)}>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"대회명"} height={"normal"}/>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                           type={"text"}
                           className={style.titleInput}
                           placeholder="대회명을 입력해주세요"
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"종별"} height={"normal"}/>
                    <Select
                        components={makeAnimated()}
                        options={options}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        placeholder={"선택"}
                        className={style.select}
                        onChange={(values: MultiValue<any>) => divisionHandler(values)}
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"날짜"} height={"normal"}/>
                    <CustomDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                      setEndDate={setEndDate}/>
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"장소"} height={"double"}/>
                    <PlaceArea places={places} setPlaces={setPlaces}/>
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"URL"} height={"normal"}/>
                    <input type="text"
                           placeholder="대회 관련 URL을 입력해주세요"
                           className={style.urlInput}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRelatedUrl(e.target.value)}
                    />
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"첨부파일"} height={"double"}/>
                    <AddFiles/>
                </div>
            </form>
        </div>
    );
};

export default AddCompetitionPage;