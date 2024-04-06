import React from "react";
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "./features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "./features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
import LoginPage from "../pages/loginPage/ui/LoginPage";

function App() {
    return (
        <div className="App">
            <header>nav</header>
            <div style={{minHeight: "calc(100vh - 110px)",  paddingTop:"180px"}}>
            <Routes>
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
            </div>
            <footer>footer</footer>
        </div>
    );
}
//appRouter

export default App;
