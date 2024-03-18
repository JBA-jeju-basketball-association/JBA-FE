import { Reset } from "styled-reset";
import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../shared/colors";
function App() {
  return (
    <ThemeProvider theme={colors}>
      <div className="App">
        <Reset />
        <div>nav</div>
        <Routes>
          <Route path="main" element={<div>메인</div>} />
        </Routes>
        <div>footer</div>
      </div>
    </ThemeProvider>
  );
}
//appRouter

export default App;
