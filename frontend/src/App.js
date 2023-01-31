import logo from './logo.svg';
import './App.css';
import Login from './components/account/Login'
import Home from './components/Home.js';
import DataProvider from "./context/DataProvider.js";
import {BrowserRouter,Routes,Route,Outlet,Navigate} from "react-router-dom";
import Header from "./components/Header.js";
import {useState} from "react";
import CreateBlog from './components/createBlog';
import UpdateBlog from './components/updateBlog';


const PrivateRoute = ({ isUserAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('token');
  console.log(isUserAuthenticated)
  return isUserAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />
};



function App() {
  const [isUserAuthenticated,setUserAuthenticated]=useState(false)
  return (
      <DataProvider>
        <BrowserRouter>
        <div style={{marginTop:"64px"}}>
          <Routes>

            <Route path='/login' element={<Login setUserAuthenticated={setUserAuthenticated} />}/> 

            <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/create' element={<CreateBlog />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/update/:id' element={<UpdateBlog />} />
            </Route>
          </Routes>
        </div>
        </BrowserRouter>
      </DataProvider>
  );
}

export default App;
