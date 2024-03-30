import * as React from 'react';
import PageTitle from "../../../../shared/ui/pageTitle/PageTitle";
import style from "./AddCompetitionPage.module.css"
import {Input} from "../../../../shared/ui/Input";
import {useState} from "react";
import CheckBox from "../../../../shared/ui/checkbox/CheckBox";
import AddCompetitionLabel from "../../../../shared/ui/addCompetitionLabel/AddCompetitionLabel";

const AddCompetitionPage:React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [division, setDivision] = useState<boolean>(false)

    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회등록"/>
            <div className={style.container}>
                <form>
                    <div className={style.inputArea}>
                        <AddCompetitionLabel label={"대회명"} />
                        <input onChange={setTitle} type={"text"} width={900}/>
                    </div>
                    <div>
                        <label>종별</label>
                        <div className={style.checkBox}>
                            <CheckBox name={"element"} value={"elementValue"} />
                            <label>초등</label>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddCompetitionPage;