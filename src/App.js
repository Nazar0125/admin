import React from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'

import './App.css';

import {Header} from './components/header'
import {Auth} from './pages/auth/index';
import {routes} from './navigation/routes.js';

function App() {
  let navigate = useNavigate();

  const {isAuth} = useSelector((state) => {
    return {
      isAuth: state.user.isAuth,
    }
  });
  React.useEffect(() => {
    if (!isAuth){
       return navigate("/auth");
    }
 },[!isAuth]);

  return (
      <>
        {isAuth &&
        <div className = "app">
          <Header />
          <div className = 'main'>
            <Routes>
              {
                routes.map((page, i) => {
                  return (
                      <Route path = {page.path} element = {page.element} key = {i}/>
                    )
                })
              }
            </Routes>
          </div>
        </div>
        }
        {
          !isAuth &&
          <Routes>
            <Route path = "/" element = { <Auth /> } />
            <Route path = "/auth" element = { <Auth /> } />
          </Routes>
        }
      </>
  );
}

export default App;
/*
<div className = "app">
      <>
        {isAuth &&
        <>
          <Header />
          <div className = 'main'>
            <Routes>
              <Route path = "/" element = { <Templates /> } />
              <Route path = "/create-template" element = { <CreateTemplate /> } />
              <Route path = "/template/:id" element = { <UpdateTemplate /> } />
              <Route path = "/prices" element = { <Prices /> } />
              <Route path = "/auth" element = { <Auth /> } />
              <Route path = "*" element = { <NotFound /> } />
            </Routes>
          </div>
        </>
        }
      </>
      {
        !isAuth &&
          <Routes>
            <Route path = "/" element = { <Auth /> } />
            <Route path = "*" element = { <NotFound /> } />
          </Routes>
      }
    </div>
*/