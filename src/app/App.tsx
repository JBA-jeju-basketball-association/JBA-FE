import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  PostCompetitionPage,
  CompetitionDetailPage,
  CompetitionPage,
  PostCompetitionResultPage,
  PostCompetitionSchedulePage,
  PrivateRoute,
  UpdateCompetitionResultPage,
  UpdateCompetitionPage,
  UpdateCompetitionSchedulePage,
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
import { LoginPage } from "../pages/loginPage";
import Main from "../pages/mainPage/ui/Main";
import { Header } from "../widgets/header";
import { Admin } from "../pages/admin";
import QueryProvider from "utils/query/queryProvider";
import {SignUpPage} from "../pages/signUp";
import { FaqPage } from "pages/faqPage";
import { ChairmanPage } from "pages/chairmanPage";
import {CompetitionVideo} from "../pages/competitionVideo";
import {ProfilePage} from "../pages/user";

function App() {
  useAxiosInterceptor();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryProvider>
      {!isAdminRoute && <Header />}
      <div id="wrapper">
        <Routes>
          {/*메인페이지*/}
          <Route path="/" element={<Main />} />

          {/*회원가입, 로그인*/}
          <Route path="signup" element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path={"/profile"} element={<ProfilePage />}/>

          {/*대회관련*/}
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path={"/competition/:id"} element={<CompetitionDetailPage />}/>

          {/*게시물 관련*/}
          <Route path={"/post/:category"} element={<PostListPage />} />
          <Route path={"/post/:category/:postId"} element={<PostDetailPage />}/>
          <Route path={"/post/competitionVideo"} element={<CompetitionVideo />} />

          {/*갤러리 관련*/}
          <Route path={"/gallery"} element={<GalleryPage />} />

          {/*기타*/}
          <Route path={"/community/faq"} element={<FaqPage/>}/>
          <Route path={"/about/chairman"} element={<ChairmanPage/>}/>

          {/*Admin, Master 계정만 접근 가능한 페이지*/}
          <Route element={<PrivateRoute />}>
            {/*대회관련*/}
            <Route path="/competition/post" element={<PostCompetitionPage />} />
            <Route path="/competition/post/schedule/:id" element={<PostCompetitionSchedulePage/>}/>
            <Route path="/competition/post/result/:id" element={<PostCompetitionResultPage/>}/>
            <Route path="/competition/update/:id" element={<UpdateCompetitionPage/>}/>
            <Route path="/competition/update/schedule/:id" element={<UpdateCompetitionSchedulePage/>}/>
            <Route path="/competition/update/result/:id" element={<UpdateCompetitionResultPage />}/>

            {/*게시물 관련*/}
            <Route path={"/post/:category/add"} element={<AddPostPage />} />
            <Route path={"/post/:category/:postId/update"} element={<UpdatePostPage />}/>

            {/*갤러리 관련*/}
            <Route path={"/admin/galleryupload"} element={<GalleryUploadPage />}/>
            <Route path={"/admin/galleryedit/:galleryId"} element={<GalleryEditPage />}/>

            {/*어드민 관련*/}
            <Route path={"/admin/"} element={<Admin />} />
            <Route path={"/admin/:menu"} element={<Admin />} />
          </Route>


        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </QueryProvider>
  );
}

export default App;
