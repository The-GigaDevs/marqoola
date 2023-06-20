import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useAuth0 } from "@auth0/auth0-react";
import {Navigate} from 'react-router-dom';


 const LandingPage = () => {

  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <div className="home">
      {!isLoading &&!isAuthenticated && (
        <>
          <Navigate to='/' />
        </>
      )}
      {isAuthenticated && (
        <>
          <Sidebar />
      <div className="homeContainer">
        <Navbar />
        

        <div className="charts">
          
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        
      </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
