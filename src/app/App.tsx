import React from "react";
import style from "./App.module.css"
import { Routes, Route} from "react-router-dom";
import {
    AddCompetitionPage,
    AddResultPage,
    CompetitionDetailPage,
    CompetitionPage,
    PrivateRoute, UpdateCompetitionResultPage
} from "../pages/competitionPage";
import {Footer} from "../widgets/footer"
import {useAxiosInterceptor} from "../shared/api/UseAxiosInterceptor";
import {GalleryUploadPage} from '../pages/galleryUploadPage'
import {GalleryPage} from "pages/galleryPage";
import {UpdateCompetitionPage} from "../pages/competitionPage/ui/UpdateCompetitionPage";
import '../shared/base.css'
import { SignupForm } from "../features/signup/ui/SignupForm";
import Header from "./header/Header";
import MenuBar from "entities/MenuBar/ui/MenuBar";
import Logo from "shared/ui/Logo/Logo";
import {LoginPage} from "../pages/loginPage";

function App() {
    useAxiosInterceptor();
    return (
        <div>
            <Header/>
            <div className={style.wrapper}>
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
                    <Route element={<PrivateRoute/>}>
                        <Route path="/add-competition" element={<AddCompetitionPage/>}/>
                        <Route path="/competition/update-competition/:id" element={<UpdateCompetitionPage/>}/>
                        <Route path="/competition/add-result/:id" element={<AddResultPage/>}/>
                        <Route path="/competition/update-result/:id" element={<UpdateCompetitionResultPage/>}/>
                    </Route>
                    <Route path="/competition" element={<CompetitionPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path={"/competition/:id"} element={<CompetitionDetailPage/>}/>
                    <Route path={"/gallery"} element={<GalleryPage/>}/>
                    <Route path={"/galleryupload"} element={<GalleryUploadPage/>}/>
                </Routes>
            </div>
            <Footer></Footer>
        </div>
    );
}
//appRouter

export default App;
