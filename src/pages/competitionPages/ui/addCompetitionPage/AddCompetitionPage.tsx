import * as React from 'react';
import PageTitle from "../../../../shared/ui/pageTitle/PageTitle";
import style from "./AddCompetitionPage.module.css"
import {useState} from "react";
import AddCompetitionLabel from "../../../../shared/ui/addCompetitionLabel/AddCompetitionLabel";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CustomDatePicker from "../../../../shared/ui/datepicker/CustomDatePicker";
import PlaceArea from "../../../../entities/competition/ui/PlaceArea";
import AddFiles from "../../../../features/competition/ui/addFiles/AddFiles";

const AddCompetitionPage:React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [zipcode, setZipcode] = useState<string>("")
    const [roadAddress, setRoadAddress] = useState<string>("")
    const [detailAddress, setDetailAddress] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    
    

    const addTitle = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setTitle(e.target.value)
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

    const toggle = () =>{
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    const completeHandler = (data:any) =>{
        console.log(data)
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false); //추가
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };


    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회등록"/>
            <form className={style.container} onSubmit={(event)=>formSubmitHandler(event)}>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"대회명"} height={"normal"}/>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => addTitle(e)}
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
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"날짜"} height={"normal"}/>
                    <CustomDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                      setEndDate={setEndDate}/>
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"장소"} height={"double"}/>
                    <PlaceArea />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"URL"}  height={"normal"}/>
                    <input type="text"
                           placeholder="대회 관련 URL을 입력해주세요"
                           className={style.urlInput}
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"첨부파일"}  height={"normal"}/>
                    <input type="file" multiple/>
                </div>
                <AddFiles />
            </form>
        </div>
    );
};

export default AddCompetitionPage;