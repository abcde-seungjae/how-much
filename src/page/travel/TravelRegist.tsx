import React, { useState } from "react";

import { db } from "api/firebase-util";
import { getAuth } from "firebase/auth";
import { Country, TravelType } from "types/travel";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";

import ImageNotSupported from "asset/image/common/image_not_supported.svg";
import member1 from "asset/image/travel/member1.png";
import member2 from "asset/image/travel/member2.png";
import member3 from "asset/image/travel/member3.png";
import member4 from "asset/image/travel/member4.png";
import member5 from "asset/image/travel/member5.png";
import member6 from "asset/image/travel/member6.png";

function TravelRegist() {
  const currentUser = getAuth().currentUser;

  /**
   * parameter
   */
  const [formData, setFormData] = useState<TravelType>({
    id: "",
    country: "",
    startDate: undefined,
    endDate: undefined,
    member: 1,
  });

  const [countryFocus, setCountryFocus] = useState(true);
  const [memberFocus, setMemberFocus] = useState(true);

  const [searchResult, setSearchResult] = useState<Array<Country>>([]);

  /** input창 변경 감지 */
  const [searchChk, setSearchChk] = useState(false);

  const onTravelRegist = () => {
    if (currentUser && currentUser.email) {
      const newTravelRef = doc(db, "travel");

      setDoc(newTravelRef, {
        country: formData.country,
        startDate: new Date(),
        endDate: new Date(),
        member: formData.member,
      });
    }
  };

  const countryInputChange = (country_nm: string) => {
    setSearchChk(false);
    getContries(country_nm);

    if (searchResult.length === 1) {
      setSearchChk(true);
    }

    setFormData((_formData) => ({
      ..._formData,
      country: country_nm,
    }));
  };

  const getContries = debounce(async (searchText: string) => {
    const q = query(
      collection(db, "countries"),
      where("country_nm", ">=", searchText),
      where("country_nm", "<=", searchText + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const searchResponse = [] as Array<Country>;

    querySnapshot.forEach((item) => {
      searchResponse.push({
        country_eng_nm: item.data().country_eng_nm,
        country_iso_alp2: item.data().country_iso_alp2,
        country_nm: item.data().country_nm,
        iso_alp3: item.data().iso_alp3,
        country_img_url: item.data().country_img_url,
      });
    });

    setSearchResult(searchResponse);
  }, 500);

  return (
    <>
      <div className="flex flex-col w-full px-5">
        <h3 className="my-5 font-bold transition-all translate-y-2 opacity-0 animate-fadeup">
          어디로 가시나요?
        </h3>
        <div
          className="relative flex flex-col w-full z-1"
          onFocus={(e) => {
            getContries(formData.country);
            setCountryFocus(true);
          }}
          onBlur={() => {
            setCountryFocus(false);
          }}
        >
          <div
            className={`flex flex-row w-full border-b items-center ${
              !countryFocus && !searchChk
                ? "border-hm-plum"
                : "border-slate-700"
            }`}
          >
            <input
              type="text"
              name="country"
              value={formData.country}
              className={`h-10 px-4 py-1 text-base outline-none focus:outline-none`}
              onChange={(e) => {
                countryInputChange(e.target.value);
              }}
            />
          </div>
          {countryFocus ? (
            <div className="mx-[2px] py-4 mb-5 bg-white max-h-[300px] overflow-y-scroll absolute top-12 w-full">
              {searchResult ? (
                searchResult.map((item) => {
                  return (
                    <>
                      <div
                        className="flex flex-row items-center p-3 mt-2 cursor-pointer first:mt-0 bg-slate-100 hover:bg-hm-yellow rounded-2xl"
                        onMouseDown={() => {
                          setSearchChk(true);
                          setFormData((_formData) => ({
                            ..._formData,
                            country: item.country_nm,
                          }));
                        }}
                      >
                        <div className="flex items-center justify-center w-6 h-6 p-[2px] bg-white rounded-lg">
                          <img
                            src={item.country_img_url}
                            className="max-w-[18px] max-h-[18px]"
                            onError={(e) => {
                              const target = e.target as HTMLInputElement;
                              target.src = ImageNotSupported;
                            }}
                          />
                        </div>
                        <span className="ml-4 text-sm">{item.country_nm}</span>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div></div>
                </>
              )}
            </div>
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
        <h3 className="mt-10 mb-5 font-bold transition-all translate-y-2 opacity-0 animate-fadeup">
          몇명이서 놀러가나요?
        </h3>
        <div
          className="relative flex flex-col w-full z-1"
          onFocus={(e) => {
            getContries(formData.country);
            setCountryFocus(true);
          }}
          onBlur={() => {
            setCountryFocus(false);
          }}
        >
          <div
            className={`flex flex-row w-full border-b items-center ${
              !countryFocus && !searchChk
                ? "border-hm-plum"
                : "border-slate-700"
            }`}
          >
            <input
              type="text"
              name="member"
              min={1}
              className={`h-10 px-4 py-1 text-base outline-none focus:outline-none`}
              value={formData.member}
              readOnly
            />
          </div>
        </div>

        <select>
          <option>
            <img src={member1} />
          </option>
        </select>
        <button type="button" onClick={onTravelRegist}>
          여행 등록하기
        </button>
      </div>
    </>
  );
}

export default TravelRegist;
