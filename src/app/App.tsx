import React from "react";
import { Routes, Route} from "react-router-dom";
import Test from "./Test";
import LoginPage from "../pages/loginPage/LoginPage";
function App():React.JSX.Element {
    return (
        <div className="App">
            <div>nav</div>
            <Routes>
                <Route path="main" element={<div>메인</div>}/>
                <Route path="login" element={<LoginPage />} />
                <Route path="test" element={<Test/>}/>
            </Routes>
            <div>footer</div>
        </div>
    );
}
//appRouter

export default App;
