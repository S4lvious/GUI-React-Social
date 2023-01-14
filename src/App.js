import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>,
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
