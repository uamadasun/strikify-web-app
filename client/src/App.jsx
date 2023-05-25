import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SiteHeader from "./components/SiteHeader";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <SiteHeader>
        {/* <h1>hello</h1> */}
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="dashboard/:id" element={<Dashboard />}/>
        </Routes>
      </SiteHeader>
    </div>
  );
}

export default App;
