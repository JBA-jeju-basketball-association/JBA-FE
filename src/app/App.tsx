import React from "react";
import style from "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  AddCompetitionPage,
  AddResultPage,
  CompetitionDetailPage,
  CompetitionPage,
  PrivateRoute,
  UpdateCompetitionResultPage,
} from "../pages/competitionPage";
import {
  AddPostPage,
  PostDetailPage,
  PostListPage,
  UpdatePostPage,
} from "../pages/postPage";
import { Footer } from "../widgets/footer";
import { useAxiosInterceptor } from "../shared/api/UseAxiosInterceptor";
import GalleryUploadPage from "../pages/galleryUploadPage/ui";
import GalleryPage from "pages/galleryPage/ui";
import { UpdateCompetitionPage } from "../pages/competitionPage/ui/UpdateCompetitionPage";
import "../shared/base.css";
import { SignupForm } from "../features/signup/ui/SignupForm";
import Header from "./header/Header";
import MenuBar from "entities/MenuBar/ui/MenuBar";
import Logo from "shared/ui/Logo/Logo";
import { LoginPage } from "../pages/loginPage";
import Main from "../pages/mainPage/ui/Main";
import {JbaHistoryPage} from "../pages/jbaHistoryPage/JbaHistoryPage";

function App() {
  useAxiosInterceptor();
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <Routes>
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
            <Route path="/add-competition" element={<AddCompetitionPage />} />
            <Route
              path="/competition/update-competition/:id"
              element={<UpdateCompetitionPage />}
            />
            <Route
              path="/competition/add-result/:id"
              element={<AddResultPage />}
            />
            <Route
              path="/competition/update-result/:id"
              element={<UpdateCompetitionResultPage />}
            />
            <Route path={"/post/:category/add"} element={<AddPostPage />} />
            <Route path={"/post/:category/:postId/update"} element={<UpdatePostPage />} />
          </Route>
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path={"/competition/:id"}
            element={<CompetitionDetailPage />}
          />
          <Route path={"/gallery"} element={<GalleryPage />} />
          <Route path={"/galleryupload"} element={<GalleryUploadPage />} />
          <Route path={"/post/:category"} element={<PostListPage />} />
          <Route path={"/post/:category/:postId"} element={<PostDetailPage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
