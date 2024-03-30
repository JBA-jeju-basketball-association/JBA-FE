import React from "react";
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "./features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "./features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
import AddCompetitionPage from "../pages/competitionPages/ui/addCompetitionPage/AddCompetitionPage";
function App() {
  return (
      <div className="App">
        <div style={{width:"100%", height:"190px", backgroundColor:"lightgray"}}>nav</div>
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
        <div style={{width:"100%", height:"110px", backgroundColor:"lightgray", position:"absolute", bottom: 0}}>footer</div>
      </div>
  );
}
//appRouter

export default App;
