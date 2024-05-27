import React from "react";
import { Routes, Route} from "react-router-dom";
import '../shared/base.css'
import { SignupForm } from "../features/signup/ui/SignupForm";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
import LoginPage from "../pages/loginPage/ui/LoginPage";
import Header from "./header/Header";
import MenuBar from "entities/MenuBar/ui/MenuBar";
import Logo from "shared/ui/Logo/Logo";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="signup" element={<div><SignupForm/></div>} />
                <Route path="main" element={<div>main</div>}/>
                {/*컴포넌트 테스트를 위한 임시 path */}
                <Route path="zzuyeontest" element={
                    <div>
                        <MenuBar></MenuBar>
                        <Logo></Logo>
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
