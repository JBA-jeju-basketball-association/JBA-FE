import React from "react";
import { Routes, Route} from "react-router-dom";
import { SignupForm } from "../features/signup/ui/SignUpForm";
import { UploadFileList } from "../features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "../features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
import SignUpPage from "pages/signUp/ui/SignUpPage/SignUpPage";
import LoginPage from "../pages/loginPage/ui/LoginPage";
import Header from "./header/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="signup" element={<div><SignUpPage/></div>} />
                <Route path="main" element={<div>main</div>}/>
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
