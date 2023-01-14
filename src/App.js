import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home"
import NavBar from "./components/navBar/NavBar"
import LeftBar from "./components/leftBar/LeftBar"
import RightBar from "./components/rightBar/RightBar"
import Profile from "./pages/profile/Profile"
import "./style.scss"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {

  const {darkMode} = useContext(DarkModeContext)

  const currentUser = true;

  const Layout = () =>{
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{ display: "flex" }}>
          <LeftBar/>
          <div style={{flex: "6"}}>
          <Outlet/>
          </div>
          <RightBar/>
        </div>
     </div>
    
    );
  };

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to ="/login/"/>
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: (<ProtectedRoute><Layout/></ProtectedRoute>),
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        }
      ]
    },
    
    {
      path:"/register",
      element: <Register/>,
    },
    {
      path:"/login",
      element: <Login/>,
    },

  ]);




  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
