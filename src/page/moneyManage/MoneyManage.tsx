import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DateTime } from "luxon";

function MoneyManage() {
  const { state } = useLocation();

  /**
   * useEffect
   */
  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <div>
        <h3 className="font-extrabold">{state.travelName}</h3>
        <div className="flex flex-row text-hm-yellow">
          <h4 className="font-extrabold">
            {DateTime.fromJSDate(state.startDate).toFormat("yyyy-MM-dd")}
          </h4>
          <h4 className="px-1 font-extrabold">~</h4>
          <h4 className="font-extrabold">
            {DateTime.fromJSDate(state.endDate).toFormat("yyyy-MM-dd")}
          </h4>
        </div>
      </div>
    </>
  );
}

export default MoneyManage;
