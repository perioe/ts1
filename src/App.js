import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Detail from "./Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
