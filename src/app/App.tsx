import React from "react";
import { Routes, Route} from "react-router-dom";
import { SignupForm } from "../features/signup/ui/SignupForm";
import { UploadFileList } from "../features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "../features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
import LoginPage from "../pages/loginPage/ui/LoginPage";
import Main from "../pages/mainPage/ui/Main";
import Header from "./header/Header";
import {useAxiosInterceptor} from "./hocs/UseAxiosInterceptor";

function App() {
    useAxiosInterceptor();
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="signup" element={<div><SignupForm/></div>} />
                <Route path="main" element={<Main />}/>
                {/*컴포넌트 테스트를 위한 임시 path */}
                <Route path="zzuyeontest" element={
                    <div>
                        <UploadFileList></UploadFileList>
                        <UpLoadButton></UpLoadButton>
                    </div>
                }/>
                <Route path="/add-competition" element={<AddCompetitionPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Routes>
            <footer>footer</footer>
        </div>
    );
}
//appRouter

export default App;
