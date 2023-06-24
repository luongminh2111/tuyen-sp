import React from "react";
import "../styles/TopDealsStyle.scss";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function TodayTopDeals(props) {

  const hotelDeal = useSelector(state => state.hotel.deals);
  const tourDeal = useSelector(state => state.tour.deals);
  const vehicleDeal = useSelector(state => state.vehicle.deals);

  console.log("check tourDeal :", tourDeal);

  const items = useMemo(() => {
    const arr = [];
    arr.concat(hotelDeal?.[0]);
    arr.concat(tourDeal?.[0]);
    arr.concat(vehicleDeal?.[0]);
    return arr;
  }, [hotelDeal, tourDeal, vehicleDeal]);

  console.log("check itemsssssss :", tourDeal);

  return (
    <div className="top-deals">
      <div className="top-deals-wrapper">
        <div className="title d-flex justify-content-center">
          Today's Top Deals
        </div>
        <div className="divide-1"></div>
        <div className="list-deal">
          {tourDeal?.map(e => {
            return (
              <div className="banner-wrapper">
                <div className="banner-image">
                  <img
                    src={e.image}
                    alt="banner"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="name">{e?.name}</div>
                <div className="description">{e?.description}</div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
export default TodayTopDeals;


