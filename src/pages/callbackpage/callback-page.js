import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useAuth0 } from "@auth0/auth0-react";


 const CallbackPage = () => {


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        

        <div className="charts">
          
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        
      </div>
    </div>
  );
};

export default CallbackPage;