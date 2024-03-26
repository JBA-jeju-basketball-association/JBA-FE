import React from "react";
import { Routes, Route} from "react-router-dom";
function App() {
  return (
      <div className="App">
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div>메인</div>} />
        </Routes>
        <div>footer</div>
      </div>
  );
}
//appRouter

export default App;
