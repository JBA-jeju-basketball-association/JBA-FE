import React from "react";
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "./features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "./features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
function App() {
  return (
      <div className="App">
        <header>nav</header>
        <Routes>
          <Route path="main" element={<div>main</div>} />
          {/*컴포넌트 테스트를 위한 임시 path */}
          <Route path="zzuyeontest" element={
            <div>
                <UploadFileList></UploadFileList>
                <UpLoadButton></UpLoadButton>
            </div>
          } />
            <Route path="/add-competition" element={<AddCompetitionPage />} />
        </Routes>
        <footer >footer</footer>
      </div>
  );
}
//appRouter

export default App;
