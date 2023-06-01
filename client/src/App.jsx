import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SiteHeader from "./components/SiteHeader";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import axios from "axios";
import { API, BEARER } from "./constant";
import { getToken } from "./helpers";
import ShopPage from "./pages/ShopPage";
import Background from "./components/Background";
export const ShopContext = createContext();

function App() {
  const [shops, setShops] = useState([])
  const { user, setUser } = useAuthContext();
  useEffect(() => {
    if (user) {
      axios
        .get(`${API}/shops?filters[shop_owner][$eq]=${user.username}`, {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        })
        .then((res) => {
          setShops(res.data.data);
        });
    }
  }, [user,]);
  
  return (
    <div className="App">
      
      
      <SiteHeader>
      
        {/* <h1>hello</h1> */}
        <ShopContext.Provider value={[shops, setShops]}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="dashboard/:id" element={<Dashboard />}/>
          <Route path="shops/:id" element={<ShopPage />}/>
        </Routes>
        </ShopContext.Provider>
        
      </SiteHeader>
      
      
    </div>
  );
}

export default App;
