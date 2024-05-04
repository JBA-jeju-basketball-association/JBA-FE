import React from "react";
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "../features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "../features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import {AddCompetitionPage} from "../pages/competitionPage";
import {Footer} from "../widgets/footer"
import {LoginPage} from "../pages/loginPage";
import Main from "../pages/mainPage/ui/Main";
import {Header} from "../widgets/header";
import {useAxiosInterceptor} from "../shared/api/UseAxiosInterceptor";
import SignUpPage from "../pages/signUp/ui/SignUpPage/SignUpPage";

function App() {
    useAxiosInterceptor();
    return (
        <div className="App">
            <Header />
            <Routes>

                <Route path="signup" element={<div><SignUpPage/></div>} />
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
            <footer ><Footer></Footer></footer>
        </div>
    );
}
//appRouter

export default App;
