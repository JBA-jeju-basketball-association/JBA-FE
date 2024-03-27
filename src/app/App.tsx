import React from "react";
import { Routes, Route} from "react-router-dom";
import { UploadFileList } from "./features/post/upLoadFile/ui/upLoadFileList/UpLoadFileList";
import { UpLoadButton } from "./features/post/upLoadFile/ui/UpLoadButton/UpLoadButton";
function App() {
  return (
      <div className="App">
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div>main</div>} />
          {/*컴포넌트 테스트를 위한 임시 path */}
          <Route path="zzuyeontest" element={
          <div>
            <UploadFileList></UploadFileList>
            <UpLoadButton></UpLoadButton>
          </div>
          } />
        </Routes>
        <div>footer</div>
      </div>
  );
}
//appRouter

export default App;
