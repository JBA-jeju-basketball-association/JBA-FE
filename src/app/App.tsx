import React from "react";
import { Routes, Route} from "react-router-dom";
import { SignupForm } from "./signup/ui/SignupForm";
function App() {
  return (
      <div className="App">
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div><SignupForm/></div>} />
        </Routes>
        <div>footer</div>
      </div>
  );
}
//appRouter

export default App;
