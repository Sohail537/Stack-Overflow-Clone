import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Plans from "./Plans";

const Pricing = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <Plans />
      </div>
    </div>
  );
};

export default Pricing;
