import React from "react";
import { Routes, Route} from "react-router-dom";
import { SelectedFile } from "./features/post/upLoadFile/ui/upLoadFileList/selectedFile/SelectedFile";
function App() {
  return (
      <div className="App">
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div>main</div>} />
          {/*컴포넌트 테스트를 위한 임시 path */}
          <Route path="zzuyeontest" element={<div><SelectedFile name={"이건파일명"}>X</SelectedFile></div>} />
        </Routes>
        <div>footer</div>
      </div>
  );
}
//appRouter

export default App;
