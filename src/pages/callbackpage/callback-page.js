import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useAuth0 } from "@auth0/auth0-react";
import {Navigate} from 'react-router-dom';


 const CallbackPage = () => {

  const { isLoading, isAuthenticated, user } = useAuth0();

  function persistUserSession() {
    if (isAuthenticated) {

    }
  }

  persistUserSession();

  return (
    <div className="home">
      {!isLoading && !isAuthenticated && (
        <>
           <Navigate to='/' />
        </>
      )}
      {isAuthenticated && (
        <>
          <Navigate to='/landingpage' />
        </>
      )}
    </div>
  );
};

export default CallbackPage;
