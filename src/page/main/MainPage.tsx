import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Carousel1 } from "asset/image/main/carousel_1.svg";
import { ReactComponent as CarouselBg } from "asset/image/main/carousel_bg.svg";

import { getAuth } from "firebase/auth";

function MainLayout() {
  const navigate = useNavigate();

  const currentUser = getAuth().currentUser;

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <>
      <div className="w-screen h-full bg-hm-beise">
        <div
          id="carousel"
          className="relative w-full overflow-hidden bg-hm-yellow -top-5"
        >
          <div className="relative flex flex-col px-10 pb-0 pt-14 md:p-0 z-1">
            <div className="relative flex flex-row">
              <h2 className="mb-3 font-bold text-black-33 font-PretendardB">
                여행의 첫걸음,
              </h2>
            </div>
            <span className="text-base font-medium text-hm-brown font-Pretendard">
              여행 계획부터 가계부까지
              <br />
              모두 한 곳에서 관리하세요.
            </span>
            {/* 이미지 변경 영역 */}
            <div className="flex justify-end mt-0 ml-4">
              <Carousel1 className="min-w-[150px] max-w-[400px]" />
            </div>
            <button
              className={`rounded-2xl bg-hm-plum transition-all text-white max-w-[25rem] w-full py-4 text-base font-medium my-10 shadow-xl shadow-hm-plum/40`}
              onClick={() => {
                if (currentUser) {
                  navigate("/travel");
                } else {
                  navigate("/login");
                }
              }}
            >
              여행 만들러 가기
            </button>
          </div>
          <CarouselBg className="absolute w-[120%] max-w-screen-2xl transform -translate-x-1/2 min-w-[1300px] left-1/2 bottom-0" />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
