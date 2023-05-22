import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SiteHeader from "./components/SiteHeader";


function App() {
  return (
    <div className="App">
      <SiteHeader/>
      {/* <h1>hello</h1> */}
      <Routes>
            <Route exact path="/" element={<Homepage />} />

          </Routes>
      
    </div>
  );
}

export default App;
