import React from "react";
import { Routes, Route} from "react-router-dom";
import { SelectedFile } from "./features/post/upLoadFile/ui/upLoadFileList/selectedFile/SelectedFile";
function App() {
  return (
      <div className="App">
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div><SelectedFile name={"이건파일명"}>"눌러"</SelectedFile>
          <input></input></div>} />
        </Routes>
        <div>footer</div>
      </div>
  );
}
//appRouter

export default App;
