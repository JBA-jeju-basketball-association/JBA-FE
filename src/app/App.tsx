import React from "react";
import style from "./App.css";
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
import { JbaHistoryPage } from "../pages/jbaHistoryPage/JbaHistoryPage";
import { Header } from "../widgets/header";
import { Admin } from "../pages/admin";
import QueryProvider from "utils/query/queryProvider";
import {SignUpPage} from "../pages/signUp";
import { FaqPage } from "pages/faqPage";
import { ChairmanPage } from "pages/chairmanPage";

function App() {
  useAxiosInterceptor();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryProvider>
      {!isAdminRoute && <Header />}
      <div className={style.wrapper}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/competition/post" element={<PostCompetitionPage />} />
            <Route path="/competition/post/schedule/:id" element={<PostCompetitionSchedulePage/>}/>
            <Route path="/competition/post/result/:id" element={<PostCompetitionResultPage/>}/>
            <Route path="/competition/update/:id" element={<UpdateCompetitionPage/>}/>
            <Route path="/competition/update/schedule/:id" element={<UpdateCompetitionSchedulePage/>}/>
            <Route path="/competition/update/result/:id" element={<UpdateCompetitionResultPage />}/>
            <Route path={"/post/:category/add"} element={<AddPostPage />} />
            <Route
              path={"/post/:category/:postId/update"}
              element={<UpdatePostPage />}
            />
            <Route
              path={"/admin/galleryupload"}
              element={<GalleryUploadPage />}
            />
            <Route
              path={"/admin/galleryedit/:galleryId"}
              element={<GalleryEditPage />}
            />
            <Route path={"/admin/"} element={<Admin />} />
            <Route path={"/admin/:menu"} element={<Admin />} />
          </Route>
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path={"/competition/:id"} element={<CompetitionDetailPage />}/>
          <Route path={"/gallery"} element={<GalleryPage />} />
          <Route path={"/post/:category"} element={<PostListPage />} />
          <Route
            path={"/post/:category/:postId"}
            element={<PostDetailPage />}
          />
          <Route
            path={"/community/faq"}
            element={<FaqPage/>}
          />
          <Route
            path={"/about/chairman"}
            element={<ChairmanPage/>}
          />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </QueryProvider>
  );
}

export default App;
