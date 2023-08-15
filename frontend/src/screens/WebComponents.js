import React from 'react';
import SideBar from '../components/SideBar';
import SaltFeature from '../components/webComponents/SaltFeature';
import PastaFeature from '../components/webComponents/PastaFeature';
import WheatFeature from '../components/webComponents/WheatFeature';

const WebComponents = () => {
  return (
    <div className="main-content">
      <SideBar />
      <div className="content-wrapper">
        <div className="section-title">
          <h2>Components</h2>
        </div>
        <div className="content-inner">
          <div className="upper-content">
            <h4>These are the all listed components</h4>
            <button hidden>Add New</button>
          </div>
          <div className="listed-components">
            <SaltFeature />
            <PastaFeature />
            <WheatFeature />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebComponents;
