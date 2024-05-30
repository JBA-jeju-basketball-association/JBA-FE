import React from "react";
import style from "./App.module.css"
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "../features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "../features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import {
    AddCompetitionPage,
    AddResultPage,
    CompetitionDetailPage,
    CompetitionPage,
    PrivateRoute, UpdateCompetitionResultPage
} from "../pages/competitionPage";
import {Footer} from "../widgets/footer"
import {LoginPage} from "../pages/loginPage";
import Main from "../pages/mainPage/ui/Main";
import {Header} from "../widgets/header";
import {useAxiosInterceptor} from "../shared/api/UseAxiosInterceptor";
import SignUpPage from "../pages/signUp/ui/SignUpPage/SignUpPage";
import GalleryUploadPage from '../pages/galleryUploadPage/ui'
import GalleryPage from "pages/galleryPage/ui";
import {UpdateCompetitionPage} from "../pages/competitionPage/ui/UpdateCompetitionPage";

function App() {
    useAxiosInterceptor();
    return (
        <div>
            <Header/>
            <div className={style.wrapper}>
                <Routes>

                    <Route path="signup" element={<div><SignUpPage/></div>}/>
                    <Route path="main" element={<Main/>}/>

                    {/*컴포넌트 테스트를 위한 임시 path */}
                    <Route path="zzuyeontest" element={
                        <div>
                            <UploadFileList></UploadFileList>
                            <UpLoadButton></UpLoadButton>
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
                    <Route path={"/galleryUpload"} element={<GalleryUploadPage/>}/>
                </Routes>
            </div>
            <Footer></Footer>
        </div>
    );
}
//appRouter

export default App;
