import React from "react";
import "../styles/WhyChoose.scss";

function WhyChoose(props) {
  return (
    <div className="benefit-wrapper">
      <div className="benefit-content">
        <div className="title">Why Choose</div>
        <div className="divide-1"></div>
        <div className="list-benefit d-flex">
          <div className="benefit-item benefit-1">
            <div className="icon"><i className="fa-solid fa-tag"></i></div>
            <div className="title-1">Competitive Pricing</div>
            <div className="title-2">
              With 500+ suppliers and the purchasing power of 300 million
              members, mytravel.com can save you more!
            </div>
          </div>
          <div className="benefit-item benefit-2">
            <div className="icon"><i className="fa-solid fa-earth-europe"></i></div>
            <div className="title-1">Competitive Pricing</div>
            <div className="title-2">
              With 500+ suppliers and the purchasing power of 300 million
              members, mytravel.com can save you more!
            </div>
          </div>
          <div className="benefit-item benefit-3">
            <div className="icon"><i className="fa-solid fa-earth-europe"></i></div>
            <div className="title-1">Competitive Pricing</div>
            <div className="title-2">
              With 500+ suppliers and the purchasing power of 300 million
              members, mytravel.com can save you more!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyChoose;
