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
import NewOrder from "./pages/NewOrder";
export const ShopContext = createContext();

function App() {
  const [shops, setShops] = useState([])
  const { user, setUser } = useAuthContext();
  useEffect(() => {
    if (user) {
       axios
      .get(`${API}/users/me`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      })
      .then(async (res) => {
        await setShops(res.data.shops);
        // console.log(res.data)
        // console.log(user)
      });
    }
  }, [user,]);
  
  return (
    <div className="App">
      
      
      <SiteHeader>
        <Background>
      
        {/* <h1>hello</h1> */}
        <ShopContext.Provider value={[shops, setShops]}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="dashboard/:id" element={<Dashboard />}/>
          <Route path="shops/:id" element={<ShopPage />}/>
          <Route path="order" element={<NewOrder />}/>
        </Routes>
        </ShopContext.Provider>
        </Background>
        
      </SiteHeader>
      
      
    </div>
  );
}

export default App;
