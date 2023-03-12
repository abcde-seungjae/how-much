import React, { useEffect, useState } from "react";
import { app, db } from "api/firebase-util";
import {
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TravelType } from "types/travel";
import { DateTime } from "luxon";

const auth = getAuth(app);

function Travel() {
  const navigate = useNavigate();
  const collectionRef = collection(db, "travel");
  const [countriesResult, setCountriesResult] = useState<Array<TravelType>>([]);
  //const docRef = doc(db, "travel", "");

  /**
   * useEffect
   */
  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        console.log(await getDocs(query(collection(db, "travel"))));
        const q = query(collection(db, "travel"), where("uid", "==", user.uid));

        await getDocs(q).then((res) => {
          if (!res.empty) {
            const searchResponse = [] as Array<TravelType>;
            res.forEach((item) => {
              console.log(item.data().startDate.seconds);

              searchResponse.push({
                country: item.data().country,
                travelName: item.data().travelName,
                startDate: new Date(item.data().startDate.seconds * 1000),
                endDate: new Date(item.data().endDate.seconds * 1000),
                member: item.data().member,
              });
            });

            setCountriesResult(searchResponse);
          }
        });
      } else {
        console.log("No user is currently logged in.");
      }
    });
  }, []);

  return (
    <>
      <div className="mt-10">
        {!countriesResult ? (
          <>
            <div>아직 없?</div>
            <button className="" onClick={() => navigate("/travelRegist")}>
              여행 추가하기
            </button>
          </>
        ) : (
          <>
            <h5 className="mb-2 font-semibold">최근여행지</h5>
            <div>
              {countriesResult.map((item) => {
                return (
                  <>
                    <div
                      className="flex flex-col h-48 p-2 cursor-pointer w-36 rounded-xl bg-hm-yellow"
                      onClick={() => {
                        navigate("/moneyManage", { state: item });
                      }}
                    >
                      <h4 className="flex-1 font-extrabold text-hm-brown">
                        {item.country}
                      </h4>
                      <div className="flex flex-col text-xs text-right text-hm-brown">
                        <div>
                          <span className="mr-2 font-light">
                            {DateTime.fromJSDate(item.startDate).toFormat(
                              "yyyy-MM-dd"
                            )}
                          </span>
                          출발
                        </div>
                        <div>
                          <span className="mr-2 font-brown">
                            {DateTime.fromJSDate(
                              item.endDate || item.startDate
                            ).toFormat("yyyy-MM-dd")}
                          </span>
                          도착
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Travel;
