import React from "react";
import style from "./App.css";
import {Routes, Route, useLocation} from "react-router-dom";
import {
  PostCompetitionPage,
  CompetitionDetailPage,
  CompetitionPage, PostCompetitionResultPage, PostCompetitionSchedulePage,
  PrivateRoute,
  UpdateCompetitionResultPage, UpdateCompetitionPage, UpdateCompetitionSchedulePage
} from "../pages/competitionPage";
import {
  AddPostPage,
  PostDetailPage,
  PostListPage,
  UpdatePostPage,
} from "../pages/postPage";
import { Footer } from "../widgets/footer";
import { useAxiosInterceptor } from "../shared/api/UseAxiosInterceptor";
import {
  GalleryUploadPage,
  GalleryPage,
  GalleryEditPage,
} from "pages/galleryPages";
import "../shared/base.css";
import { SignupForm } from "../features/signup/ui/SignupForm";
import MenuBar from "entities/MenuBar/ui/MenuBar";
import Logo from "shared/ui/Logo/Logo";
import { LoginPage } from "../pages/loginPage";
import Main from "../pages/mainPage/ui/Main";
import { JbaHistoryPage } from "../pages/jbaHistoryPage/JbaHistoryPage";
import {Header} from "../widgets/header";
import {Admin} from "../pages/admin";

function App() {
  useAxiosInterceptor();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && <Header/>}
      <div className={style.wrapper}>
        <Routes>
          <Route path={"/admin"} element={<Admin />}/>
          <Route
            path="signup"
            element={
              <div>
                <SignupForm />
              </div>
            }
          />
          <Route path="/" element={<Main />} />
          {/*컴포넌트 테스트를 위한 임시 path */}
          <Route
            path="zzuyeontest"
            element={
              <div>
                <MenuBar></MenuBar>
                <Logo></Logo>
              </div>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/competition/post" element={<PostCompetitionPage />} />
            <Route path="/competition/post/schedule/:id" element={<PostCompetitionSchedulePage/>}/>
            <Route path="/competition/post/result/:id" element={<PostCompetitionResultPage/>}/>
            <Route path="/competition/update/:id" element={<UpdateCompetitionPage/>}/>
            <Route path="/competition/update/schedule/:id" element={<UpdateCompetitionSchedulePage/>}/>
            <Route path="/competition/update/result/:id" element={<UpdateCompetitionResultPage />}/>
            <Route path={"/post/:category/add"} element={<AddPostPage />} />
            <Route path={"/post/:category/:postId/update"} element={<UpdatePostPage />} />
            <Route path={"/gallery/galleryupload"} element={<GalleryUploadPage />} />
            <Route path={"/gallery/galleryedit"} element={<GalleryEditPage />} />
          </Route>
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path={"/competition/:id"} element={<CompetitionDetailPage />}/>
          <Route path={"/gallery"} element={<GalleryPage />} />
          <Route path={"/post/:category"} element={<PostListPage />} />
          <Route path={"/post/:category/:postId"} element={<PostDetailPage />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer/>}
    </div>
  );
}

export default App;
