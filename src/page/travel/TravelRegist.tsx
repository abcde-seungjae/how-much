import React, {
  useState,
  useId,
  FunctionComponentElement,
  useEffect,
} from "react";

import { db } from "api/firebase-util";
import { getAuth } from "firebase/auth";
import { Country, TravelType } from "types/travel";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { debounce } from "lodash";
import DatePicker from "react-datepicker";
import "asset/css/datepicker-custom.scss";
import "react-datepicker/dist/react-datepicker.css";

import ImageNotSupported from "asset/image/common/image_not_supported.svg";
import { ReactComponent as Face1 } from "asset/image/travel/face.svg";
import { ReactComponent as Face2 } from "asset/image/travel/face_2.svg";
import { ReactComponent as Face3 } from "asset/image/travel/face_3.svg";
import { ReactComponent as Face4 } from "asset/image/travel/face_4.svg";
import { ReactComponent as Face5 } from "asset/image/travel/face_5.svg";
import { ReactComponent as Face6 } from "asset/image/travel/face_6.svg";
import { ReactComponent as Face7 } from "asset/image/travel/face_7.svg";

import { ReactComponent as Arrow } from "asset/image/common/arrow_right.svg";

import { DateTime } from "luxon";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import ko from "date-fns/locale/ko";
import { differenceInDays } from "date-fns/esm";
import { useNavigate } from "react-router-dom";

function TravelRegist() {
  const currentUser = getAuth().currentUser;
  const navigate = useNavigate();

  /**
   * parameter
   */
  const [formData, setFormData] = useState<TravelType>({
    country: "",
    startDate: new Date(),
    endDate: null,
    member: 0,
  });

  const [countryFocus, setCountryFocus] = useState(true);
  const [calenderFocus, setCalenderFocus] = useState(false);

  const [searchResult, setSearchResult] = useState<Array<Country>>([]);

  /** validation check error message */
  const [error, setError] = useState("");

  /** input창 변경 감지 */
  const [searchChk, setSearchChk] = useState(false);

  const [faceArray, setFaceArray] = useState<
    Array<
      FunctionComponentElement<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >
    >
  >([]);
  const face = [
    <Face1 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
    <Face2 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
    <Face3 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
    <Face4 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
    <Face5 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
    <Face6 key={useId()} className="w-10 h-10 mb-2 mr-4" />,
  ];

  /**
   * useEffect
   */
  useEffect(() => {
    memberChange(1);
  }, []);

  /**
   * Function
   */
  const onTravelRegist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.country.trim()) {
      setError("여행 국가를 입력하세요.");
      setCountryFocus(false);
      return;
    }
    if (formData.member <= 0) {
      setError("최소 1명 이상의 여행 인원을 입력하세요.");
      return;
    }

    if (currentUser && currentUser.email) {
      const docName = formData.country + new Date().getTime();
      const newDocRef = doc(db, "travel", docName);

      await setDoc(newDocRef, {
        uid: currentUser.uid,
        country: formData.country,
        travelName: formData.country + " 여행",
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        member: formData.member,
      });

      const travel = await getDoc(newDocRef);
      navigate("/moneyManage", {
        state: {
          ...travel.data(),
          startDate: new Date(travel.data()?.startDate.seconds),
          endDate: new Date(travel.data()?.endDate.seconds),
        },
      });
    } else {
      setError("로그인이 풀렸습니다. 재로그인 후 진행하세요!");
      navigate("/");
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

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    return `#${red}${green}${blue}`;
  }

  const memberChange = (member: number) => {
    setFormData((_formData) => ({
      ..._formData,
      member: member || 0,
    }));

    setFaceArray((_faceArray) => {
      const newArray = [..._faceArray];
      if (formData.member > member) {
        newArray.splice(member, _faceArray.length - member);
      } else if (formData.member < member) {
        for (let i = _faceArray.length; i < member; i++) {
          const random_0_5 = Math.floor(Math.random() * 5);
          newArray.push(
            React.cloneElement(face[random_0_5], {
              style: { fill: getRandomColor() },
            })
          );
        }
      }
      return newArray;
    });
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
      <form
        className="flex flex-col justify-between w-full"
        onSubmit={onTravelRegist}
      >
        <div className="mt-5 space-y-10">
          <div>
            <h4 className="mb-1 font-bold transition-all translate-y-2 opacity-0 animate-fadeup">
              어디로 가시나요?
            </h4>
            <div
              className="relative flex flex-col w-full z-1 animate-fadeup"
              onFocus={() => {
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
                  className={`h-10 px-4 py-1 text-base outline-none focus:outline-none w-full`}
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
                            <span className="ml-4 text-sm">
                              {item.country_nm}
                            </span>
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
          </div>
          <div>
            <h4 className="mb-1 font-bold transition-all translate-y-2 opacity-0 animate-fadeup">
              몇명이서 놀러가나요?
            </h4>
            <div className="relative flex flex-col w-full animate-fadeup">
              <div
                className={`flex flex-row w-full border-b items-center ${
                  formData.member ? "border-slate-700" : "border-hm-plum"
                }`}
              >
                <input
                  type="number"
                  name="member"
                  min={0}
                  className={`h-10 px-4 py-1 text-base outline-none focus:outline-none w-full`}
                  onChange={(e) => {
                    const member = parseInt(e.target.value);
                    memberChange(member || 0);
                  }}
                  value={formData.member.toString().replace(/(^0+)/, "")}
                />
              </div>
              <div className="flex flex-row flex-wrap p-3 mt-4 overflow-auto bg-hm-yellow/30 rounded-2xl">
                {formData.member ? (
                  faceArray.map((item, idx) => {
                    return <React.Fragment key={idx}>{item}</React.Fragment>;
                  })
                ) : (
                  <>
                    <Face7 className="w-10 h-10 mb-2 mr-4" />
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-1 font-bold transition-all translate-y-2 opacity-0 animate-fadeup">
              몇일동안 머무를 예정인가요?
            </h4>
            <div
              className="flex flex-row justify-between w-full animate-fadeup"
              onClick={() => {
                setCalenderFocus(true);
              }}
            >
              <div>
                <span className="text-base">
                  {DateTime.fromJSDate(formData.startDate).toFormat(
                    "yyyy-MM-dd"
                  )}
                </span>
                <span className="px-5 text-lg">~</span>
                <span className="text-base">
                  {DateTime.fromJSDate(
                    formData.endDate ?? formData.startDate
                  ).toFormat("yyyy-MM-dd")}
                </span>
              </div>
              <div>
                <span className="mr-2">
                  {differenceInDays(
                    formData.endDate ?? formData.startDate,
                    formData.startDate
                  )}
                  박
                </span>
                <span>
                  {differenceInDays(
                    formData.endDate ?? formData.startDate,
                    formData.startDate
                  ) + 1}
                  일
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute z-2 flex flex-col justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
            calenderFocus ? "" : "hidden"
          }`}
        >
          <div
            id="datepicker__wrapper"
            className={`flex flex-col items-center justify-center p-2 bg-white rounded-2xl`}
          >
            <DatePicker
              selected={formData.startDate}
              startDate={formData.startDate}
              endDate={formData.endDate}
              onChange={(dates) => {
                const [start, end] = dates;

                setFormData((_formData) => ({
                  ..._formData,
                  startDate: start ?? new Date(),
                  endDate: end,
                }));
              }}
              locale={ko}
              selectsRange
              inline
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="btn_month btn_month-prev"
                    onClick={decreaseMonth}
                    //disabled={prevMonthButtonDisabled}
                  >
                    <Arrow className="fill-[#1C1B1F] rotate-180" />
                  </div>
                  <div className="flex items-center justify-center month-day">
                    {getYear(date)}.{getMonth(date) + 1}
                  </div>

                  <div
                    className="btn_month btn_month-next"
                    onClick={increaseMonth}
                    //disabled={nextMonthButtonDisabled}
                  >
                    <Arrow className="fill-[#1C1B1F]" />
                  </div>
                </div>
              )}
            />
            <button
              type="button"
              className="px-4 py-2 mx-auto my-2 text-xs rounded-full bg-hm-yellow"
              onClick={() => setCalenderFocus(false)}
            >
              확인
            </button>
          </div>
        </div>
        <div
          className={`w-full h-screen fixed bg-black/30 z-1 top-0 left-0 ${
            calenderFocus ? "" : "hidden"
          }`}
          onClick={() => {
            setCalenderFocus(false);
          }}
        />
        <div className="flex flex-col">
          <span className="w-full h-3 mt-10 text-sm text-left align-bottom text-hm-plum">
            {error}
          </span>
          <button
            type="submit"
            //onClick={onTravelRegist}
            className="w-full py-4 mt-3 mb-7 bg-hm-yellow rounded-xl"
          >
            여행 등록하기
          </button>
        </div>
      </form>
    </>
  );
}

export default TravelRegist;
